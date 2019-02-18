<template>
  <div class="maintenance">
    <banner />
    <div class="page-container ">
      <div class="search-box">
        <el-input v-model="keyword" @keyup.native.enter="search" filterable placeholder="please input serial number, and press Enter key" />
        <i class="search-icon" />
      </div>
      <div v-if="model.thumbnail">
        <div :style="{backgroundImage:`url(${path+model.thumbnail})`}" class="thumbnail bg-center" />
        <div class="serial-number">
          <div>{{model.productName}}</div>
          <span>Serial Number : {{keyword}}</span>
        </div>
        <ul class="maintenance-list">
          <li><span>Product type:</span> {{map[model.classification]}}</li>
          <li><span>Contract number:</span> {{model.contract}}</li>
          <li><span>Date of purchase:</span> {{setDate(model.purchase_date)}}</li>
          <li><span>Warranty date:</span> {{setDate(model.warranty_date)}}</li>
          <li><span>Warranty period:</span> {{model.warranty_period}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner/banner';
import { getBySN } from '@/api/maintenance';
import { parseTime } from '@/utils'
export default {
  name: 'Maintenance',
  components: { banner },
  data() {
    return {
      keyword: '',
      path: '/upload/product/',
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
      getBySN(this.keyword).then(res => {
        if (res.data && res.data.thumbnail) {
          this.model = res.data;
        } else {
          this.modal=[];
          this.$message.info('Can not found relevant information');
        }
      })
    },
    setDate(date) {
      return parseTime(date, '{y}-{m}-{d}');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-box {
  position: relative;
  width: 50%;
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
.maintenance {
  .el-input__inner {
    padding-left: 40px;
  }
}
</style>
