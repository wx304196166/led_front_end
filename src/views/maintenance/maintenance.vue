<template>
  <div>
    <banner />
    <div class="page-container ">
      <input type="text" placeholder="please enter the serial number" class="searchInput">
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
export default {
  name: 'Maintenance',
  components: { banner }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.thumbnail {
  width: 200px;
  height: 200px;
  margin: 50px auto 0;
  border: 1px solid #000;
}
.searchInput {
  border-radius: 10px;
  background-color: #eee;
  height: 20px;
  width: 50%;
  padding-left: 10px;
  margin-right: 10px;
  margin: 0 auto;
  display: block;
}
.serialNumber {
  text-align: center;
}
.maintenanceUl {
  padding: 0 5%;
}
.maintenanceUl li {
  padding: 13px 0;
}
</style>
