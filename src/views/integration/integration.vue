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
                <div
                  v-show="!canvasDialog"
                  class="cover-container"
                  :style="{width:coverWidth,height:coverHeight}"
                >
                  <!-- <div
                    v-for="item in screenTotal"
                    :key="item"
                    :style="{width:`${100/screenCol}%`,height:`${100/screenRow}%`,backgroundImage:`url(${ledScreen})`}"
                    class="cover"
                  />-->
                  <img ref="logo" :src="logo" alt>
                </div>
                <canvas v-show="canvasDialog" ref="screenBox" :width="canvasW" :height="canvasH"></canvas>

                <img ref="ledScreen" :src="ledScreen" alt style="display:none">
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
          <el-table-column prop="cate_name" label="Classification"/>
          <el-table-column prop="name" label="name">
            <template slot-scope="scope">
              <el-input v-if="scope.row.isInput" v-model="scope.row.name"></el-input>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brand_name" label="Brand"/>
          <el-table-column prop="specification" label="Specification"/>
          <el-table-column prop="number" label="Number">
            <template slot-scope="scope">
              <!-- <el-input-number
                v-if="!(scope.row.isMain||scope.row.isInput)"
                v-model="scope.row.number"
                :min="1"
                controls-position="right"
                size="small"
              ></el-input-number>-->
              <span v-if="!(scope.row.isMain||scope.row.isInput)">{{ scope.row.number }}</span>
              <span v-else>{{ screenCol }} * {{ screenRow }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="isSize" label="Screen Size" align="center">
            <template slot-scope="scope">
              <span class="size">{{ scope.row.w}}&nbsp;*&nbsp;{{ scope.row.h }}</span>
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
    <!-- <div v-show="canvasDialog" class="canvas-box" @click.self="canvasDialog=false">
      <div style="width:500px;height:325px">
        <i class="el-dialog__close el-icon el-icon-close" @click.stop="canvasDialog=false"></i>
      </div>
    </div>-->
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
import logo from "@/assets/img/logo.png";

export default {
  name: "Integration",
  components: { related, banner },
  data() {
    return {
      ledScreen,
      logo,
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
      mainId: "",
      schemeName: {
        cate_name: "Scheme name",
        name: "",
        isInput: true
      },
      remarks: {
        cate_name: "Remarks",
        name: "",
        isInput: true
      },
      swichDialog: false,
      list: [],
      spacingList: [],
      curSpacing: 0,
      cabinets: [],
      size: [0, 0],
      screenBox: null,
      ledScreenObj: null,
      logoObj: null,
      canvasDialog: false,
      canvasW: 500,
      canvasH: 328
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
    },
    token() {
      return this.$store.getters.token;
    }
  },

  mounted() {
    this.ledScreenObj = this.$refs.ledScreen;
    this.logoObj = this.$refs.logo;
    this.screenBox = this.$refs.screenBox;

    this.setCover();
    this.recover();
    window.addEventListener("resize", this.setCover);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setCover);
  },
  methods: {
    async recover() {
      let res = await pointspacingList();
      if (res.code === 1) {
        this.spacingList = res.data;
      } else {
        this.$message.error(res.msg);
      }
      const id = this.$route.query.id;
      if (Number(id)) {
        res = await schemeDetails(this.token, id);
        if (res.code === 1) {
          const data = res.data;
          this.type = data.type;
          this.adjust.level.val = data.box_quantity.box_x;
          this.adjust.vertical.val = data.box_quantity.box_y;
          this.required.scenario = data.scene;
          this.required.spacing_id = Number(data.spacing);
          this.optional.type = data.stype;
          this.optional.w = data.screen_size.size_w;
          this.optional.h = data.screen_size.size_h;
          this.mainId = data.main_product.id;
          this.setSpacing();
          /* this.curMain = data.main_product;
          this.curMain.isMain = true;
          this.curMain.w = this.optional.w;
          this.curMain.h = this.optional.h;

          for (let i = 1; i < data.product_list.length; i++) {
            const item = data.product_list[i];
            this.setRelatedListMap(item.product_id);
            item.thumbnail_pic = data.featured_product[i - 1].thumbnail_pic;
            this.relatedProducts.push(item);
          } */
          this.schemeName.name = data.scheme_name;
          this.remarks.name = data.remarks;
          res = await integrationMainProduct(this.required);
          if (res.code === 1) {
            this.cabinets = res.data.list;
            for (let i = 0; i < this.cabinets.length; i++) {
              const item = this.cabinets[i];
              if (this.mainId === item.id) {
                this.setSpecifications(item);
                break;
              }
            }
            this.start(false);
          } else {
            this.$message(res.msg);
          }
        }
      } else {
        this.type = id;
      }
    },
    show() {
      this.canvasDialog = true;
      this.$nextTick(() => {
        this.animatePlay();
      });
    },
    setSpecifications(item) {
      this.curMain = item;
      this.curMain.isMain = true;

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
      // this.required.type=this.type;
      integrationMainProduct(this.required).then(res => {
        if (res.code === 1) {
          this.cabinets = res.data.list;
        } else {
          this.$message(res.msg);
        }
      });
    },
    start(isFirst = true) {
      if (isFirst) {
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
      }

      this.curMain.w = this.optional.w;
      this.curMain.h = this.optional.h;
      let e, f;
      if (this.optional.type === "size") {
        e = (this.optional.w * 1000) / this.curSpacing;
        f = (this.optional.h * 1000) / this.curSpacing;
      } else {
        e = this.optional.w;
        f = this.optional.h;
      }
      if (isFirst) {
this.adjust.level.val = Math.ceil(
        (e * this.curSpacing) / this.specifications[0]
      );
      this.adjust.vertical.val = Math.ceil(
        (f * this.curSpacing) / this.specifications[1]
      );
      this.reset();
      }
      

      this.size = [e, f];
      this.canvasW = this.$refs.screen.clientWidth;
      this.canvasH = this.$refs.screen.clientHeight;
      if(isFirst){
      this.show();
      }
      this.setCover();
      integrationProducts(e, f).then(res => {
        if (res.code === 1) {
          if (res.data.list && res.data.list.length) {
            const ids = {};
            const list = [];
            res.data.list.forEach(item => {
              if (!ids[item.id]) {
                ids[item.id] = 1;
                list.push(item);
                this.setRelatedListMap(item.cate_name);
              } else {
                list.forEach(obj => {
                  if (item.id === obj.id) {
                    obj.number += item.number;
                    return;
                  }
                });
              }
            });
            this.relatedProducts = list;

            this.setTable();
          }
        }
      });
    },
    animatePlay() {
      const canvas = this.screenBox;
      if (!canvas.getContext) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalTime = 5000;
      let col = this.screenCol;
      let row = this.screenRow;
      // 计算单块屏幕宽和高
      const totalW = this.canvasW;
      const totalH = this.canvasH;

      const screenW = totalW;
      const screenH = totalH;
      const specW = this.specifications[0];
      const specH = this.specifications[1];
      const width = specW * this.screenCol;
      const height = specH * this.screenRow;
      let w = 50;
      let h = 50;
      let offsetX = 0;
      let offsetY = 0;

      if (width / height > screenW / screenH) {
        w = screenW / col;
        h = (screenW * height) / width / row;
        offsetY = (totalH - h * row) / 2;
      } else {
        w = (screenH * width) / height / col;
        h = screenH / row;
        offsetX = (totalW - w * col) / 2;
      }

      let count = 0;
      const total = col * row;
      const time = Math.floor(totalTime / total);

      const img = this.ledScreenObj;
      const logo = this.logoObj;
      let c = 0;
      let r = 1;
      for (let i = 0; i < total; i++) {
        if (c < col) {
          c++;
        } else {
          c = 1;
          r++;
        }

        let x = (c - 1) * w + offsetX;
        let y = (r - 1) * h + offsetY;
        let timeoutId = setTimeout(() => {
          newRect(x, y);
          clearTimeout(timeoutId);
        }, time * i);
      }
      function newRect(x, y) {
        let l = x + 2 * w;
        const d = l;
        const id = setInterval(() => {
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
          if (l > x) {
            l -= 2;
            ctx.drawImage(img, l, y, w, h);
          } else {
            count++;
            clearInterval(id);
          }
          drawExisting();
        }, (time * 2) / d);
      }
      function drawExisting() {
        let c = 0;
        let r = 1;
        for (let i = 0; i < count; i++) {
          if (c < col) {
            c++;
          } else {
            c = 1;
            r++;
          }
          let x = (c - 1) * w + offsetX;
          let y = (r - 1) * h + offsetY;
          ctx.drawImage(img, x, y, w, h);
        }
        if (total === count) {
          const id = setTimeout(() => {
            final();
            clearTimeout(id);
          }, 10);
        }
      }
      function final() {
        ctx.fillStyle = "#000";
        let baseW = w / 2;
        let baseH = h / 2;
        let realW = w * col;
        let realH = h * row;
        let x = (realW - baseW) / 2 + offsetX;
        let y = (realH - baseH) / 2 + offsetY;

        let logoW = 180;
        let logoH = 70;
        let imgX = (realW - logoW) / 2 + offsetX;
        let imgY = (realH - logoH) / 2 + offsetY;

        ctx.fillRect(x, y, baseW, baseH);
        const id = setInterval(() => {
          if (x > offsetX) {
            ctx.fillRect(x, y, baseW, baseH);
            baseW = baseW < realW ? baseW + 2 : realW;
            baseH = baseH < realH ? baseH + 2 : realH;
            x--;
            y = y > offsetY ? y - 1 : offsetY;
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillRect(offsetX, offsetY, realW, realH);
            ctx.drawImage(logo, imgX, imgY, logoW, logoH);
            clearInterval(id);
          }
        }, 10);
      }
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
    setRelatedListMap(cate_name) {
      if (this.relatedListMap[cate_name]) {
        this.relatedListMap[cate_name]++;
      } else {
        this.relatedListMap[cate_name] = 1;
      }
    },
    reset() {
      this.relatedProducts = [];
      this.schemeName.name = "";
      this.remarks.name = "";
      this.relatedListMap = {};
      // this.setTable();
    },
    // 组装表格数据
    setTable() {
      let arr = [];
      arr.push(this.curMain);

      this.relatedProducts.sort((a, b) => a.cate_name > b.cate_name);

      arr = arr.concat(this.relatedProducts);
      arr.push(this.schemeName);
      arr.push(this.remarks);
      this.table = arr.concat();
    },
    // 条件合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.isMain) {
        if (column.property === "isSize") {
          return [this.table.length, 1];
        }
      } else if (row.isInput) {
        if (column.property === "cate_name") {
          return [1, 1];
        } else if (column.property === "name") {
          return [1, 4];
        }
        return [0, 0];
      } else {
        if (column.property === "cate_name") {
          if (this.lastRow.id !== row.id) {
            if (this.lastRow.cate_name === row.cate_name) {
              return [0, 0];
            }
            this.lastRow = Object.assign({}, row);
          }
          return [this.relatedListMap[row.cate_name], 1];
        } else if (column.property === "isSize") {
          return [0, 0];
        }
        return [1, 1];
      }
    },
    submitScheme() {
      const logintoken = this.$store.getters.token;
      const sendData = {
        logintoken,
        scene: this.required.scenario,
        spacing: this.required.spacing_id,
        stype: this.optional.type,
        type: this.type,
        product_id: [],
        product_number: []
      };
      for (const row of this.table) {
        switch (row.cate_name) {
          case "Scheme name":
            sendData.name = row.name;
            break;
          case "Remarks":
            sendData.remarks = row.name;
            break;
          default:
            if (row.isMain) {
              sendData.product_id.push(row.id);
              sendData.product_number.push(this.screenTotal);

              sendData.size_w = Number(this.optional.w);
              sendData.size_h = Number(this.optional.h);
              sendData.box_x = this.screenCol;
              sendData.box_y = this.screenRow;
            } else {
              sendData.product_id.push(row.id);
              sendData.product_number.push(row.number);
            }
            break;
        }
      }
      if (!sendData.name) {
        this.$message.warning("Scheme name can not be empty!");
        return;
      }

      submit(sendData).then(res => {
        if (res.code === 1) {
          this.$message.success("Submit success!");
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
  .size {
    color: #e70088;
    font-size: 19.2px;
  }
}
</style>