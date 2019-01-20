<template>
  <div class="container">
    <input type="text" placeholder="please enter the serial number" class="searchInput">
    <div class="thumbnail">

    </div>
    <div class="serialNumber">
      <div>Led Colorful HD Display</div>
      <span>serial number : 1245654687s</span>
    </div>
    <div>
      Essential infomation
    </div>
  </div>
</template>

<script>

export default {
  name: 'Maintenance'

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
</style>
