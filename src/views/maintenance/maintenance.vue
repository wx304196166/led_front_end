<template>
  <div class="maintenance">
    <banner/>
    <div class="page-container">
      <div class="search-box">
        <el-select v-model="type" placeholder="please select serch type">
          <el-option label="SN" value="sn"/>
          <el-option label="Contract or Maintenance" value="ma"/>
        </el-select>
        <div class="input">
          <el-input
            v-model="keyword"
            @keyup.native.enter="search"
            placeholder="please input, and press Enter key to search"
          />
          <i class="search-icon"/>
        </div>
      </div>
      <div v-if="model.name">
        <div v-if="type==='sn'">
          <div
            :style="{backgroundImage:`url(${model.thumbnail_pic})`}"
            class="thumbnail bg-center"
          />
          <div class="serial-number">
            <div>{{model.name}}</div>
            <span>Serial Number : {{model.sn}}</span>
          </div>
          <ul class="maintenance-list">
            <li>
              <span>Product type:</span>
              {{model.type}}
            </li>
            <li>
              <span>Contract number:</span>
              {{model.contract_no}}
            </li>
            <li>
              <span>Maintenance number:</span>
              {{model.maintenance_no}}
            </li>
            <li>
              <span>Date of purchase:</span>
              {{setDate(model.buy_time)}}
            </li>
            <li>
              <span>Warranty date:</span>
              {{setDate(model.warranty_period)}}
            </li>
            <li>
              <span>Warranty period:</span>
              {{model.warranty}}
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
      model: {}
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
          this.model = res.data.product;
          this.model.contract_no = res.data.contract_no;
          this.model.maintenance_no = res.data.maintenance_no;
        } else {
          this.modal = {};
          this.$message.warning(res.msg);
        }
      });
    },
    setDate(date) {
      return parseTime(date, "{y}-{m}-{d}");
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
    width: calc(100% - 300px);
    margin-left: 30px;
  }
}
.thumbnail {
  width: 300px;
  height: 250px;
  margin: 50px auto 0;
  border: 1px solid #000;
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
}
.maintenance-list {
  margin-left: 10%;
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
