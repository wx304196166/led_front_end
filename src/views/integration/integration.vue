<template>
  <div class="integration">
    <banner />
    <ul class="page-container clearfix">
      <li class="show-box clearfix">
        <ul class="show clearfix">
          <li class="title">Led Colourful HD Display</li>
          <li class="img-box bg"></li>
          <li class="title">Specifications:
            <span class="spec">{{specifications[0]}}*{{specifications[1]}}</span>
          </li>
          <li>
            Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis.
          </li>
        </ul>
        <div class="blank"></div>
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
                  {{specifications[1]*screenCol}} CM
                </div>
                <div class="bar">
                  <div />
                </div>
              </li>
              <li class="screen">
                <div class="cover" :style="{width:`${100/screenCol}%`,height:`${100/screenRow}%`}" v-for="item in screenTotal" :key="item" />
              </li>
            </ul>
            <div class="x clearfix">
              <div class="bar">
                <div />
              </div>
              <div class="number">
                {{specifications[0]*screenCol}} CM
              </div>
              <div class="bar">
                <div />
              </div>
            </div>
          </li>
        </ul>
        <div class="blank"></div>
        <div class="related">
          <related :list="list" @get-item="getItem" />
        </div>
      </li>
      <li class="parms-table">
        <el-table :data="table" :span-method="arraySpanMethod" border style="width: 100%" header-row-class-name="table-head">
          <!-- <el-table :data="table" border style="width: 100%" header-row-class-name="table-head"> -->

          <el-table-column prop="classification" label="Classification" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="brand" label="Brand" />
          <el-table-column prop="specifications" label="Specifications">
            <template slot-scope="scope">
              <span>{{scope.row.specifications[0]}}&nbsp;*&nbsp;{{scope.row.specifications[1]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="Number" />

          <el-table-column prop="isSize" label="Screen Size" align="center">
            <template slot-scope="scope">
              <span class="size">{{scope.row.specifications[0]*screenCol}}&nbsp;*&nbsp;{{scope.row.specifications[1]*screenCol}}</span>
            </template>
          </el-table-column>

        </el-table>
      </li>
      <li class="submit pointer">
        <div>Submit</div>
      </li>
    </ul>
  </div>

</template>

<script>
import related from '@/components/Related/related';
import banner from '@/components/Banner/banner';

import main from './tableData'
import list from './related';

export default {
  name: 'Integration',
  components: { related, banner },
  data() {
    return {
      specifications: [300, 200],
      adjust: {
        // clearnce: { val: 10, unit: 'mm' },
        level: { val: 3, unit: '' },
        vertical: { val: 2, unit: '' }
      },
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
      main,
      list
    };
  },
  computed: {
    screenTotal() {
      return this.adjust.level.val * this.adjust.vertical.val
    },
    screenRow() {
      return this.adjust.vertical.val
    },
    screenCol() {
      return this.adjust.level.val
    }
  },
  created() {
    /* for (const item of this.list) {
      this.setRelatedListMap(item.classification);
      
      this.relatedList.push(this.setItem(item))
    } */
    this.setTable()
  },
  methods: {
    setRelatedListMap(classification) {
      if (this.relatedListMap[classification]) {
        this.relatedListMap[classification]++
      } else {
        this.relatedListMap[classification] = 1
      }
    },
    // 组装表格数据
    setTable() {
      let arr = [];
      arr.push(this.main);

      this.relatedList.sort((a, b) => a.classification > b.classification);
      arr = arr.concat(this.relatedList);
      arr.push(this.schemeName);
      arr.push(this.remarks);
      this.table = arr.concat();
      arr = null;
    },
    // 获取相关产品
    getItem(item) {
      let flag = true;

      for (const pro of this.relatedList) {
        if (pro.id === item.id) {
          pro.number++;
          flag = false;
          break;
        }
      }
      if (flag) {
        this.setRelatedListMap(item.classification);
        this.relatedList.push(this.setItem(item));
        this.setTable();
      }
    },
    setItem(item) {
      const obj = Object.assign({}, item);
      obj.number = 1;
      return obj;
    },
    // 产品数量改变时
    numberChange(value) {
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
  height: 35.7143rem;
  > ul,
  > div {
    float: left;
    height: 100%;
  }
  .blank {
    width: 1.5%;
  }
  .show {
    width: 21%;
    .title {
      font-size: 1.2857rem;
      font-weight: 700;
      height: 3.5714rem;
      line-height: 3.5714rem;
    }
    .img-box {
      height: 14.2857rem;
      background-image: url("../../assets/img/img_led01.png");
    }
    .spec {
      color: $bright;
      background: $dark;
      padding: 0 1rem;
    }
  }
  .operate {
    width: 57%;
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
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 3.5714rem);
        height: 100%;
        > div {
          background-image: url("../../assets/img/img_led02.png");
        }
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
    width: 19%;
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
}
</style>
