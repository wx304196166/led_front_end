<template>
  <div class="integration">
    <banner/>
    <ul class="page-container clearfix">
      <li class="show-box clearfix">
        <ul v-if="curMain.name" class="show clearfix">
          <li class="title text-center">{{curMain.name}}</li>
          <li class="img-box bg-center" :style="{backgroundImage:`url(${curMain.thumbnail_pic})`}"></li>
          <li v-if="curMain.id" class="title">
            Specification:
            <span class="spec">{{curMain.specification}}</span>
          </li>
          <li v-html="curMain.brief"/>
        </ul>
        <div class="show warn" v-else>Please select the application scenario and related parameters</div>
        <ul class="operate clearfix">
          <li class="adjust">
            <ul class="params">
              <li>
                <div class="option">
                  <ul>
                    <li class="label">Scene</li>
                    <li class="condition margin-r">
                      <el-select
                        v-model="required.scenario"
                        placeholder="please select"
                        style="width:100%"
                        @change="searchCabinets"
                      >
                        <el-option label="indoor" value="indoor"/>
                        <el-option label="outdoor" value="outdoor"/>
                      </el-select>
                    </li>
                    <li class="label">Spacing</li>
                    <li class="condition">
                      <el-select
                        v-model="required.spacing_id"
                        placeholder="please select"
                        style="width:100%"
                        @change="setSpacing();searchCabinets()"
                      >
                        <el-option
                          v-for="spacing in spacingList"
                          :key="spacing.id"
                          :label="spacing.name"
                          :value="spacing.id"
                        />
                      </el-select>
                    </li>
                  </ul>
                  <ul>
                    <li class="label">Type</li>
                    <li class="condition margin-r">
                      <el-select
                        v-model="optional.type"
                        placeholder="please select"
                        style="width:100%"
                      >
                        <el-option label="resolving power" value="power"/>
                        <el-option label="size" value="size"/>
                      </el-select>
                    </li>
                    <li class="condition">
                      <el-col :span="11">
                        <el-input v-model="optional.w"/>
                      </el-col>
                      <el-col class="text-center" :span="2">X</el-col>
                      <el-col :span="11">
                        <el-input v-model="optional.h"/>
                      </el-col>
                    </li>
                    <li class="unit">
                      <span v-show="optional.type==='size'">m</span>
                    </li>
                  </ul>
                </div>
                <div class="start">
                  <span @click="start">start</span>
                </div>
              </li>
              <li>
                <ul class="cabinets">
                  <li v-for="item in cabinets" :key="item.id" @click="setSpecifications(item)">
                    <span :title="`${item.name}  (${item.specification})`">{{item.name}}</span>
                    ({{item.specification}})
                  </li>
                </ul>
                <div v-if="cabinets.length>3" class="more" @click="swichDialog = true">more</div>
              </li>
            </ul>
          </li>
          <li class="screen-box">
            <ul class="clearfix">
              <li class="y">
                <div class="bar">
                  <div/>
                </div>
                <div class="number">{{size[1]}} {{optional.type==='size'?'m':'px'}}</div>
                <div class="bar">
                  <div/>
                </div>
              </li>
              <li class="screen" ref="screen">
                <div class="cover-container" :style="{width:coverWidth,height:coverHeight}">
                  <div
                    v-for="item in screenTotal"
                    :key="item"
                    :style="{width:`${100/screenCol}%`,height:`${100/screenRow}%`,backgroundImage:`url(${ledScreen})`}"
                    class="cover"
                  />
                </div>
              </li>
            </ul>
            <div class="x clearfix">
              <div class="bar">
                <div/>
              </div>
              <div class="number">{{size[0]}} {{optional.type==='size'?'m':'px'}}</div>
              <div class="bar">
                <div/>
              </div>
            </div>
          </li>
        </ul>
        <div class="related">
          <related :list="relatedProducts"/>
        </div>
      </li>
      <li v-if="curMain.id" class="parms-table">
        <el-table
          :data="table"
          :span-method="arraySpanMethod"
          border
          style="width: 100%"
          header-row-class-name="table-head"
        >
          <el-table-column prop="classification" label="Classification"/>
          <el-table-column prop="name" label="name">
            <template slot-scope="scope">
              <el-input v-if="scope.row.isInput" v-model="scope.row.name"></el-input>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brand" label="Brand"/>
          <el-table-column prop="specification" label="Specification"/>
          <el-table-column prop="number" label="Number">
            <template slot-scope="scope">
              <el-input-number
                v-if="!(scope.row.isMain||scope.row.isInput)"
                v-model="scope.row.number"
                :min="1"
                controls-position="right"
                size="small"
              ></el-input-number>
              <span v-else>{{ screenTotal }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="isSize" label="Screen Size" align="center">
            <template>
              <span class="size">{{ specifications[0]}}&nbsp;*&nbsp;{{ specifications[1] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </li>
      <li v-if="curMain.id" class="submit">
        <div @click="submitScheme" class="pointer">Submit</div>
      </li>
    </ul>
    <el-dialog :visible.sync="swichDialog" :title="`Select a ${type}`" width="760px">
      <ul class="cabinets">
        <li
          v-for="item in cabinets"
          :key="item.id"
          @click="setSpecifications(item);swichDialog = false"
        >
          <span :title="`${item.name}  (${item.specification})`">{{item.name}}</span>
          ({{item.specification}})
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="swichDialog = false" type="info">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import related from "@/components/Related/related";
import banner from "@/components/Banner/banner";

import {
  submit,
  schemeDetails,
  pointspacingList,
  integrationMainProduct,
  integrationProducts
} from "@/api/integration";

import ledScreen from "@/assets/img/img_led02.png";

export default {
  name: "Integration",
  components: { related, banner },
  data() {
    return {
      form: {
        id: "",
        spec: ""
      },
      // 集成类型 箱体/模组
      type: "cabinet",
      curMain: {},
      required: {
        scenario: "",
        spacing_id: ""
      },
      optional: {
        type: "",
        w: "",
        h: ""
      },
      rules: {
        id: [{ required: true, trigger: "change" }],
        spec: [{ required: true, trigger: "change" }]
      },
      specMap: {},
      main: [],
      specifications: [300, 200],
      adjust: {
        // clearnce: { val: 10, unit: 'mm' },
        level: { val: 5, unit: "" },
        vertical: { val: 3, unit: "" }
      },
      relatedProducts: [],
      coverWidth: 0,
      coverHeight: 0,
      relatedListMap: {},
      lastRow: {},
      table: [],
      schemeName: {
        classification: "Scheme name",
        name: "",
        isInput: true
      },
      remarks: {
        classification: "Remarks",
        name: "",
        isInput: true
      },
      relatedList: [],
      ledScreen,
      swichDialog: false,
      list: [],
      spacingList: [],
      curSpacing: 0,
      cabinets: [],
      size: [0, 0]
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
    let res = await pointspacingList();
    if (res.code === 1) {
      this.spacingList = res.data;
    } else {
      this.$message.error(res.msg);
    }
    const id = this.$route.query.id;
    if (Number(id)) {
      res = await queryOne("integrate", this.$route.query.id);
      if (res.code === 1) {
        const data = res.data;
        this.adjust.level.val = data.main_level;
        this.adjust.vertical.val = data.main_vertical;
        const related = data.related_list ? JSON.parse(data.related_list) : [];
        this.ids = related.map(item => item.id);
        this.schemeName.name = data.name;
        this.remarks.name = data.remark;
        res = await queryMany("product", { ids: this.ids });
        if (res.code === 1) {
          res.data.forEach((item, index) => {
            this.setRelatedListMap(
              this.map.classification_id[item.classification_id]
            );
            const obj = this.setProduct(item);
            obj.number = related[index].number;
            this.relatedList.push(obj);
          });
        }
        this.setTable();
      }
    } else {
      this.type = id;
    }
  },
  mounted() {
    this.setCover();
    window.addEventListener("resize", this.setCover);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setCover);
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
    setSpecifications(item) {
      this.curMain = item;
      this.specifications =
        (item.specification && item.specification.split("*")) || "";
    },
    setSpacing() {
      for (let key in this.spacingList) {
        if (this.spacingList[key].id === this.required.spacing_id) {
          this.curSpacing = this.spacingList[key].point_value;
        }
      }
    },
    searchCabinets() {
      if (this.required.scenario === "" || this.required.spacing_id === "") {
        return;
      }
      integrationMainProduct(this.required).then(res => {
        if (res.code === 1) {
          this.cabinets = res.data.list;
        } else {
          this.$message(res.msg);
        }
      });
    },
    start() {
      for (let key in this.required) {
        if (this.required[key] === "") {
          this.$message.warning("please finish the parameters");
          return;
        }
      }
      for (let key in this.optional) {
        if (this.optional[key] === "") {
          this.$message.warning("please finish the parameters");
          return;
        }
      }
      if (!this.curMain.name) {
        this.$message.warning("please select a " + this.type);
        return;
      }
      let e, f;
      // adjust.level
      if (this.optional.type === "size") {
        e = (this.optional.w * 1000) / this.curSpacing;
        f = (this.optional.h * 1000) / this.curSpacing;
      } else {
        e = this.optional.w;
        f = this.optional.h;
      }
      this.adjust.level.val = Math.ceil(
        (e * this.curSpacing) / this.specifications[0]
      );
      this.adjust.vertical.val = Math.ceil(
        (f * this.curSpacing) / this.specifications[1]
      );

      this.size = [e, f];
      this.setCover();
      integrationProducts(e, f).then(res => {
        /* res = {
          code: 1,
          msg: "请求成功",
          time: "1553434346",
          data: {
            list: [
              {
                id: 11,
                name: "LED controller MSD 300",
                thumbnail_pic: "",
                brief:
                  '<p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:14px;white-space:normal;"><span style="font-family:Arial;"></span></p><p class="MsoNormal">The\r\nMctrl 300 is the third generation of LED controller by NovaStar. This device is\r\nthe basic and top seller of medium or small project. <o:p></o:p></p><p class="MsoNormal">1\r\nDVI interface for video input. <br /> 2. USB interface for instruction communication. <br /> 3. Audio input interface integrated. <o:p></o:p></p><p class="MsoNormal">4.Light\r\nsensor interface integrated.<br /> 5. Resolutions supported: 1024×1200, 1280×1024, 1600×848, 1920×712, 2048×640. <o:p></o:p></p><p><br /></p><p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:14px;white-space:normal;"><span style="font-family:Arial;"></span></p>',
                number: 1
              },
              {
                id: 11,
                name: "LED controller MSD 300",
                thumbnail_pic: "",
                brief:
                  '<p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:14px;white-space:normal;"><span style="font-family:Arial;"></span></p><p class="MsoNormal">The\r\nMctrl 300 is the third generation of LED controller by NovaStar. This device is\r\nthe basic and top seller of medium or small project. <o:p></o:p></p><p class="MsoNormal">1\r\nDVI interface for video input. <br /> 2. USB interface for instruction communication. <br /> 3. Audio input interface integrated. <o:p></o:p></p><p class="MsoNormal">4.Light\r\nsensor interface integrated.<br /> 5. Resolutions supported: 1024×1200, 1280×1024, 1600×848, 1920×712, 2048×640. <o:p></o:p></p><p><br /></p><p style="font-family:Verdana, Arial, Helvetica, sans-serif;font-size:14px;white-space:normal;"><span style="font-family:Arial;"></span></p>',
                number: 0
              },
              {
                id: 16,
                name: "TB8",
                thumbnail_pic: "",
                brief:
                  '<p><span style="font-family:Arial;">多媒体播放器 TB8</span></p><p><span style="font-family:Arial;">带载能力 ： 230万</span></p><p><span style="font-family:Arial;">处理能力 ： 8核，2GB运行内存+板载 8GB 内部存储，用户可用 4GB</span></p><p><span style="font-family:Arial;">wifi功能 ： √（双wifi）</span></p><p><span style="font-family:Arial;">3G、4G功能 ： √（选配）</span></p><p><span style="font-family:Arial;">冗余备份 ： 冗余备份带载130万</span></p><p><span style="font-family:Arial;">同异步切换 ： √</span></p><p><span style="font-family:Arial;">拼接带载 ： √</span></p><p><span style="font-family:Arial;">使用场合 ： 固装大屏</span></p><p><span style="font-family:Arial;">14:15:00  02/26/2019</span></p><p><br /></p><p><br /></p><br />',
                number: 0
              }
            ]
          }
        }; */
        if (res.code === 1) {
          this.relatedProducts = res.data.list;
        }
      });
    },
    setProduct(pro, specification) {
      return {
        id: pro.id,
        name: pro.name,
        classification: this.map.classification_id[pro.classification_id],
        brand: this.map.brand_id[pro.brand_id],
        specifications:
          specification ||
          (pro.specifications && pro.specifications.split("*")) ||
          "",
        isMain: pro.is_main,
        intro: pro.intro,
        thumbnail: pro.thumbnail
      };
    },
    setCover() {
      const screenW = this.$refs.screen.clientWidth;
      const screenH = this.$refs.screen.clientHeight;
      const specW = this.specifications[0];
      const specH = this.specifications[1];
      const w = specW * this.screenCol;
      const h = specH * this.screenRow;

      if (w / h > screenW / screenH) {
        this.coverWidth = "100%";
        this.coverHeight = (screenW * h) / w + "px";
      } else {
        this.coverWidth = (screenH * w) / h + "px";
        this.coverHeight = "100%";
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
      this.schemeName.name = "";
      this.remarks.name = "";
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
    setItem(item) {
      const obj = Object.assign({}, item);
      obj.number = 1;
      return obj;
    },
    // 条件合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.isMain) {
        if (column.property === "isSize") {
          return [this.table.length, 1];
        }
      } else if (row.isInput) {
        if (column.property === "classification") {
          return [1, 1];
        } else if (column.property === "name") {
          return [1, 4];
        }
        return [0, 0];
      } else {
        if (column.property === "classification") {
          if (this.lastRow.id !== row.id) {
            if (this.lastRow.classification === row.classification) {
              return [0, 0];
            }
            this.lastRow = Object.assign({}, row);
          }
          return [this.relatedListMap[row.classification], 1];
        } else if (column.property === "isSize") {
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
          case "Scheme name":
            sendData.name = row.name;
            break;
          case "Remarks":
            sendData.remark = row.name;
            break;
          default:
            if (row.isMain) {
              sendData.main_id = row.id;
              sendData.main_specification =
                row.specifications[0] + "*" + row.specifications[1];
              sendData.main_level = this.screenCol;
              sendData.main_vertical = this.screenRow;
              sendData.main_clearnce = 0;
            } else {
              sendData.related_list.push({
                id: row.id,
                number: row.number
              });
            }
            break;
        }
      }
      if (!sendData.name) {
        this.$message.warning("Scheme name can not be empty!");
        return;
      }
      sendData.related_list = JSON.stringify(sendData.related_list);
      sendData.modification_user_type = 1;
      sendData.modification_user_id = token;

      submit(sendData).then(res => {
        if (res.code === 1) {
          this.$message.success("Submit success!");
          this.reset();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./integration.scss";
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
}
</style>