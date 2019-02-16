<template>
  <div class="integration">
    <banner />
    <ul class="page-container clearfix">
      <li class="show-box clearfix">
        <ul class="show clearfix">
          <li class="title text-center">{{curMain.name}}
            <i @click="swichDialog=true">
              <svg-icon icon-class="edit" />
            </i>
          </li>
          <li v-if="curMain.thumbnail" class="img-box bg-center" :style="{backgroundImage:`url(/upload/product/${curMain.thumbnail})`}"></li>
          <li v-if="curMain.id" class="title">Specifications:
            <span class="spec">{{curMain.specifications[0]}}*{{curMain.specifications[1]}}</span>
          </li>
          <li>{{curMain.intro}}</li>
        </ul>
        <ul class="operate clearfix">
          <li class="adjust">
            <ul v-for="(item,key) in adjust" :key="key" class="clearfix">
              <li>{{ key }}&nbsp;:&emsp;</li>
              <li class="slider">
                <el-slider v-model="item.val" :min="1" :max="20"></el-slider>
              </li>
              <li>&emsp;{{ item.val + item.unit }}</li>
            </ul>
          </li>
          <li class="screen-box">
            <ul class="clearfix">
              <li class="y">
                <div class="bar">
                  <div />
                </div>
                <div class="number">
                  {{curMain.specifications[1]*screenCol}} CM
                </div>
                <div class="bar">
                  <div />
                </div>
              </li>
              <li class="screen" ref="screen">
                <div class="cover-container" :style="{width:coverWidth,height:coverHeight}">
                  <div v-for="item in screenTotal" :key="item" :style="{width:`${100/screenCol}%`,height:`${100/screenRow}%`,backgroundImage:`url(${ledScreen})`}" class="cover" />
                </div>
              </li>
            </ul>
            <div class="x clearfix">
              <div class="bar">
                <div />
              </div>
              <div class="number">
                {{curMain.specifications[0]*screenCol}} CM
              </div>
              <div class="bar">
                <div />
              </div>
            </div>
          </li>
        </ul>
        <div class="related">
          <related :ids="ids" @get-item="getItem" />
        </div>
      </li>
      <li v-if="curMain.id" class="parms-table">
        <el-table :data="table" :span-method="arraySpanMethod" border style="width: 100%" header-row-class-name="table-head">

          <el-table-column prop="classification" label="Classification" />
          <el-table-column prop="name" label="name">
            <template slot-scope="scope">
              <el-input v-if="scope.row.isInput" v-model="scope.row.name"></el-input>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="Brand" />
          <el-table-column prop="specifications" label="Specifications">
            <template slot-scope="scope">
              <span>{{scope.row.specifications[0]}}&nbsp;*&nbsp;{{ scope.row.specifications[1] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="Number">
            <template slot-scope="scope">
              <el-input-number v-if="!(scope.row.isMain||scope.row.isInput)" v-model="scope.row.number" :min="1" controls-position="right" size="small"></el-input-number>
              <span v-else>{{ screenTotal }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="isSize" label="Screen Size" align="center">
            <template slot-scope="scope">
              <span class="size">{{ scope.row.specifications[0]*screenCol }}&nbsp;*&nbsp;{{ scope.row.specifications[1]*screenCol }}</span>
            </template>
          </el-table-column>

        </el-table>
      </li>
      <li v-if="curMain.id" class="submit">
        <div @click="submitScheme" class="pointer">Submit</div>
      </li>
    </ul>

    <el-dialog :visible.sync="swichDialog" width="500px">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="Main Product" prop="id" label-width="120px">
          <el-select v-model="form.id">
            <el-option v-for="item in main" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Specification" prop="spec" label-width="120px">
          <el-select v-model="form.spec">
            <el-option v-for="(item,index) in specMap[form.id]" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="swichDialog = false" type="danger">Cancel</el-button>
        <el-button @click.native.prevent="handleSwitch" type="primary">Confirm</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import related from '@/components/Related/related';
import banner from '@/components/Banner/banner';

import { submit, getMainProduct } from '@/api/integration';
import { queryOne, queryMany } from '@/api/common';

import ledScreen from '@/assets/img/img_led02.png';

export default {
  name: 'Integration',
  components: { related, banner },
  data() {
    return {
      form: {
        id: '',
        spec: ''
      },
      rules: {
        id: [{ required: true, trigger: 'change' }],
        spec: [{ required: true, trigger: 'change' }]
      },
      specMap: {},
      main: [],
      curMain: {
        specifications: [300, 200]
      },
      mainId: '',
      adjust: {
        // clearnce: { val: 10, unit: 'mm' },
        level: { val: 3, unit: '' },
        vertical: { val: 2, unit: '' }
      },
      ids: [],
      coverWidth: 0,
      coverHeight: 0,
      relatedListMap: {},
      lastRow: {},
      table: [],
      schemeName: {
        classification: 'Scheme name',
        name: '',
        isInput: true
      },
      remarks: {
        classification: 'Remarks',
        name: '',
        isInput: true
      },
      relatedList: [],
      ledScreen,
      swichDialog: false,
      list: []
    };
  },
  computed: {
    screenTotal() {
      return this.adjust.level.val * this.adjust.vertical.val;
    },
    screenRow() {
      return this.adjust.vertical.val;
    },
    screenCol() {
      return this.adjust.level.val;
    },
    map() {
      return this.$store.getters.map;
    }
  },
  async created() {
    let res = await getMainProduct();
    if (res.data && res.data.length) {
      this.main = res.data;
      this.main.forEach(item => {
        this.specMap[item.id] = item.specifications.split(',');
      })
    } else {
      this.$alert('Sorry, there is no main product !', 'Sorry', {
        confirmButtonText: 'ok',
        callback: () => {
          this.$router.push({ path: '/dashboard' });
          return;
        }
      });
    }
    if (this.$route.query.id) {
      res = await queryOne('integrate', this.$route.query.id);
      if (res.code === 0) {
        const data = res.data;
        this.mainId = data.main_id;
        this.adjust.level.val = data.main_level;
        this.adjust.vertical.val = data.main_vertical;
        const related = data.related_list ? JSON.parse(data.related_list) : [];
        this.ids = related.map(item => item.id);
        this.schemeName.name = data.name;
        this.remarks.name = data.remark;
        res = await queryMany('product', { ids: this.ids });
        if (res.code === 0) {
          res.data.forEach((item, index) => {
            this.setRelatedListMap(this.map.classification_id[item.classification_id]);
            const obj = this.setProduct(item);
            obj.number = related[index].number;
            this.relatedList.push(obj);
          })
        }
        this.setCurMain(data.main_specification);
      }
    } else {
      if (this.$route.query.productId && this.$route.query.spec) {
        this.mainId = this.$route.query.productId;
        this.setCurMain(this.$route.query.spec);
      }
    }
    this.setTable();
  },
  mounted() {
    this.setCover();
    window.addEventListener('resize', this.setCover);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCover);
  },
  watch: {
    screenRow(newVal, oldVal) {
      if (newVal != oldVal) {
        this.setCover();
      }
    },
    screenCol(newVal, oldVal) {
      if (newVal != oldVal) {
        this.setCover();
      }
    }
  },
  methods: {
    handleSwitch() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.mainId = this.form.id;
          this.setCurMain(this.form.spec);
        } else {
          return false;
        }
      })
    },
    setCurMain(specification) {
      this.main.forEach(item => {
        if (item.id === this.mainId) {
          this.ids = item.product_id.split(',');
          this.curMain = this.setProduct(item, specification.split('*'));
          return;
        }
      });
    },
    setProduct(pro, specification) {
      return {
        id: pro.id,
        name: pro.name,
        classification: this.map.classification_id[pro.classification_id],
        brand: this.map.brand_id[pro.brand_id],
        specifications: specification || pro.specifications.split('*'),
        isMain: pro.is_main,
        intro: pro.intro,
        thumbnail: pro.thumbnail
      }
    },
    setCover() {
      const screenW = this.$refs.screen.clientWidth;
      const screenH = this.$refs.screen.clientHeight;
      const specW = this.curMain.specifications[0];
      const specH = this.curMain.specifications[1];
      const w = specW * this.screenCol;
      const h = specH * this.screenRow;

      if (w / h > screenW / screenH) {
        this.coverWidth = '100%';
        this.coverHeight = screenW * h / w + 'px';
      } else {
        this.coverWidth = screenH * w / h + 'px';
        this.coverHeight = '100%';
      }
    },
    setRelatedListMap(classification) {
      if (this.relatedListMap[classification]) {
        this.relatedListMap[classification]++;
      } else {
        this.relatedListMap[classification] = 1;
      }
    },
    reset() {
      this.relatedList = [];
      this.schemeName.name = '';
      this.remarks.name = '';
      this.setTable();
    },
    // 组装表格数据
    setTable() {
      let arr = [];
      arr.push(this.curMain);

      this.relatedList.sort((a, b) => a.classification > b.classification);

      arr = arr.concat(this.relatedList);
      arr.push(this.schemeName);
      arr.push(this.remarks);
      this.table = arr.concat();
      arr = null;
    },
    // 获取相关产品
    getItem(item) {
      for (const pro of this.relatedList) {
        if (pro.id === item.id) {
          pro.number++;
          return;
        }
      }
      item = this.setProduct(item);
      this.setRelatedListMap(item.classification);
      this.relatedList.push(this.setItem(item));
      this.setTable();
    },
    setItem(item) {
      const obj = Object.assign({}, item);
      obj.number = 1;
      return obj;
    },
    // 条件合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.isMain) {
        if (column.property === 'isSize') {
          return [this.table.length, 1];
        }
      } else if (row.isInput) {
        if (column.property === 'classification') {
          return [1, 1];
        } else if (column.property === 'name') {
          return [1, 4];
        }
        return [0, 0];
      } else {
        if (column.property === 'classification') {
          if (this.lastRow.id !== row.id) {
            if (this.lastRow.classification === row.classification) {
              return [0, 0];
            }
            this.lastRow = Object.assign({}, row);
          }
          return [this.relatedListMap[row.classification], 1];
        } else if (column.property === 'isSize') {
          return [0, 0];
        }
        return [1, 1];
      }
    },
    submitScheme() {
      const token = this.$store.getters.token;
      const sendData = { related_list: [] };
      for (const row of this.table) {
        switch (row.classification) {
          case 'Scheme name': sendData.name = row.name; break;
          case 'Remarks': sendData.remark = row.name; break;
          default:
            if (row.isMain) {
              sendData.main_id = row.id;
              sendData.main_specification = row.specifications[0] + '*' + row.specifications[1];
              sendData.main_level = this.screenCol;
              sendData.main_vertical = this.screenRow;
              sendData.main_clearnce = 0;
            } else {
              sendData.related_list.push(
                {
                  id: row.id,
                  number: row.number
                }
              )
            }
            break;
        }
      }
      if (!sendData.name) {
        this.$message.warning('Scheme name can not be empty!');
        return;
      }
      sendData.related_list = JSON.stringify(sendData.related_list);
      sendData.modification_user_type = 1;
      sendData.modification_user_id = token;

      submit(sendData).then(res => {
        if (res.code === 0) {
          this.$message.success('Submit success!');
          this.reset();
        } else {
          this.$message.error(res.message);
        }
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark: #333;
$bright: #fafafa;
.integration {
  > ul {
    margin: 1.4286rem 0;
  }
}
.show-box {
  height: 550px;
  > ul,
  > div {
    float: left;
    height: 100%;
  }
  .show {
    width: 20%;
    .title {
      font-size: 1.2857rem;
      font-weight: 700;
      height: 3.5714rem;
      line-height: 3.5714rem;
      > i {
        float: right;
        cursor: pointer;
      }
    }
    .img-box {
      height: 14.2857rem;
      position: relative;
      left: -0.5rem;
    }
    .spec {
      color: $bright;
      background: $dark;
      padding: 0 1rem;
    }
  }
  .operate {
    width: 65%;
    padding: 3.5714rem 4% 0 2%;
    padding-top: 3.5714rem;
    .adjust {
      display: flex;
      width: calc(100% - 3.5714rem);
      margin-left: 3.5714rem;
      height: 38px;
      line-height: 38px;
      > ul {
        flex: 1;
        display: flex;
        justify-content: center;
      }
      .slider {
        width: 33%;
      }
    }
    .screen-box {
      height: calc(100% - 3.5714rem);
      padding-top: 3.5714rem;
      > ul {
        height: calc(100% - 3.5714rem);
        > li {
          float: left;
          height: 100%;
        }
      }
      .screen {
        width: calc(100% - 3.5714rem);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .cover-container {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .bar {
      position: relative;
      > div {
        position: absolute;
        background: $dark;
      }
    }
    .number {
      text-align: center;
    }
    .x {
      height: 3.5714rem;
      padding-left: 3.5714rem;
      > div {
        float: left;
        height: 100%;
      }
      .bar {
        width: calc(50% - 3.5714rem);
        > div {
          height: 1px;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
      .number {
        width: 7.1429rem;
        line-height: 3.5714rem;
      }
    }
    .y {
      width: 3.5714rem;
      height: 100%;
      .bar {
        height: calc(50% - 3.5714rem);
        > div {
          width: 1px;
          height: 100%;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }
      }
      .number {
        height: 7.1429rem;
        line-height: 3.5714rem;
        writing-mode: tb;
      }
    }
  }
  .related {
    width: 15%;
  }
}
.parms-table {
  // #e70088 粉色的字
  margin: 20px 0;
  .table-head {
    background-color: #000;
    color: #fff;
    opacity: 0.8;
    font-size: 1.2rem;
    font-weight: normal;
    border: none;
  }
  .size {
    color: #e70088;
    font-size: 1.2rem;
  }
}
.submit {
  text-align: center;
  > div {
    display: inline-block;
    width: 14.2857rem;
    text-align: center;
    background: linear-gradient(74deg, #49007c, #e70088);
    color: $bright;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.7857rem;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.integration {
  .el-slider__runway {
    height: 3px;
    margin: 18px 0 0;
  }
  .el-slider__bar {
    background-color: rgba(0, 0, 0, 0.4);
    height: 3px;
  }
  .el-slider__button {
    background: url("../../assets/img/slide.png") no-repeat 0 0;
    border: none;
    width: 8px;
    height: 15px;
    border-radius: 0;
  }
  .el-table_1_column_1 {
    background-color: #f2f2f2;
  }
  .table-head th {
    background-color: #000;
    color: #fafafa;
    font-weight: normal;
    border-color: #000;
  }
  .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:not(.el-table_1_column_1) {
    background-color: transparent;
  }
  .el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td.el-table_1_column_1 {
    background-color: #f2f2f2;
  }
  // .has-gutter {
  //   background-color: #000;
  //   .table-head {
  //     background-color: #000;
  //   }
  // }
}
</style>
