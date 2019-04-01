<template>
  <div class="maintenance">
    <banner/>
    <div class="page-container">
      <div class="search-box">
        <el-select v-model="type" placeholder="please select search type">
          <el-option label="Serial Number" value="sn"/>
          <el-option label="Contract or Maintenance" value="ma"/>
        </el-select>
        <div class="input">
          <el-input
            v-model="keyword"
            @keyup.native.enter="search"
            placeholder="please input, and press Enter key Or Search button to search"
          />
          <i class="search-icon"/>
        </div>
        <div class="btn" @click="search">Search</div>
      </div>
      <div>
        <div v-if="type==='sn'&&model.name" >
          <div
            :style="{backgroundImage:`url(${model.thumbnail_pic})`}"
            @click="jump(model.product_id)"
            class="thumbnail bg-center"
          />
          <div class="serial-number">
            <div @click="jump(model.product_id)">{{model.name}}</div>
            <span>Serial Number : {{model.sn}}</span>
          </div>
          <ul class="maintenance-list">
            <li>
              <span>Product type:</span>
              {{model.type}}
            </li>
            <li>
              <span>Contract number:</span>
              {{contract_no}}
            </li>
            <li>
              <span>Maintenance number:</span>
              {{maintenance_no}}
            </li>
            <li>
              <span>Date of purchase:</span>
              {{model.buy_time}}
            </li>
            <li>
              <span>Warranty date:</span>
              {{model.warranty_period}}
            </li>
            <li>
              <span>Warranty period:</span>
              {{model.warranty}}
            </li>
          </ul>
        </div>
        <div v-if="type==='ma'&&table.length">
          <ul class="maintenance-list">
            <li>
              <span>Contract number:</span>
              {{contract_no}}
            </li>
            <li>
              <span>Maintenance number:</span>
              {{maintenance_no}}
            </li>
            <li>
              <el-table :data="table" border style="width: 100%">
            
                <el-table-column prop="name" label="Name" >
                <template slot-scope="scope">
                  <span @click="jump(scope.row.product_id)" style="cursor:pointer">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="Type"/>
                <el-table-column prop="sn" label="SN"/>
                <el-table-column prop="buy_time" label="Buy Time"/>
                <el-table-column prop="warranty" label="Period"/>
                <el-table-column prop="warranty_period" label="Warranty"/>
              </el-table>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/components/Banner/banner";
import { maintenanceSearch } from "@/api/maintenance";
import { parseTime } from "@/utils";
export default {
  name: "Maintenance",
  components: { banner },
  data() {
    return {
      keyword: "",
      type: "sn",
      model: {},
      table: [],
      contract_no: "",
      maintenance_no: ""
    };
  },
  computed: {
    map() {
      return this.$store.getters.map.classification_id;
    }
  },
  methods: {
    search() {
      maintenanceSearch(this.type, this.keyword).then(res => {
        if (res.data && res.data.product) {
          if (this.type === "sn" && res.data.product.name) {
            this.model = res.data.product;
            this.contract_no = res.data.contract_no;
            this.maintenance_no = res.data.maintenance_no;
          } else if (this.type === "ma" && res.data.product.length) {
            this.table = res.data.product;
            this.contract_no = res.data.contract_no;
            this.maintenance_no = res.data.maintenance_no;
          } else {
            this.modal = {};
            this.table = [];
            this.$message.warning("Find nothing, please check your number");
          }
        } else {
          this.modal = {};
          this.table = [];
          this.$message.warning("Find nothing, please check your number");
        }
      });
    },
    jump(id) {
      window.open("/#/productDetail/" + id);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-box {
  position: relative;
  // width: 50%;
  margin: 40px auto 20px;
  text-align: center;
  .search-icon {
    position: absolute;
    transform: scale(0.6);
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;
    background: url("../../assets/img/icon_search.png") no-repeat 0 0;
  }
  .input {
    position: relative;
    display: inline-block;
    width: calc(100% - 417px);
    margin: 0 30px;
  }
  .btn{
    width: 87px;
    line-height: 40px;
    display: inline-block;
    background: linear-gradient(74deg, #49007c, #e70088);
    color: #fff;
    text-align: center;
    border-radius: 5px; 
    cursor: pointer;
  }
}
.thumbnail {
  width: 300px;
  height: 250px;
  margin: 50px auto 0;
  border: 1px solid #999;
  cursor: pointer;
}
.searchInput {
  border-radius: 10px;
  background-color: #eee;
  height: 40px;
  width: 60%;
  padding-left: 10px;
  margin: 20px auto;
  display: block;
}
.serial-number {
  line-height: 35px;
  text-align: center;
  margin: 12px 0;
  font-size: 18px;
  font-weight: 700;
  >div{
    cursor: pointer;
  }
}
.maintenance-list {
  padding: 0 5% 20px;
}
.maintenance-list li {
  padding: 13px 0;
  font-size: 16px;
  span {
    padding-right: 8px;
    font-weight: 700;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.input {
  .el-input__inner {
    padding-left: 40px;
  }
}
</style>
