<template>
  <div class="maintenance">
    <banner />
    <div class="page-container ">
      <div class="searchBox">
        <search/>
        <i class="searchIcon" />
      </div>
      <div class="thumbnail" />
      <div class="serialNumber">
        <div>Led Colorful HD Display</div>
        <span>serial number : 1245654687s</span>
      </div>
      <ul class="maintenanceUl">
        <li>Product type: xxxxxxxxx</li>
        <li>Contract number: xxxxxxxxx</li>
        <li>Date of purchase: xxxxxxxxx</li>
        <li>Warranty date: xxxxxxxxx</li>
        <li>Warranty period: xxxxxxxxx</li>
      </ul>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner/banner';
import search from '@/components/Search/search';
export default {
  name: 'Maintenance',
  components: { banner, search }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.searchBox {
  position: relative;
  width: 50%;
  margin: 40px auto 20px;
  text-align: center;
  .searchIcon {
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
  width: 200px;
  height: 200px;
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
.serialNumber {
  line-height: 30px;
  text-align: center;
}
.maintenanceUl {
  margin-left: 10%;
  padding: 0 5%;
}
.maintenanceUl li {
  padding: 13px 0;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.maintenance {
  .el-select {
    width: 100%;
  }
  .el-input__inner {
    padding-left: 40px;
  }
}
</style>
