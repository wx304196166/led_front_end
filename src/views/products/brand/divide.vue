<template>
  <div class="productBrand">
    <!-- brand -->
    <span>Brand:</span>
    <span v-for="(item,index) in brands" :key="index" class='brand'>{{item}}</span>
    <!-- search -->
    <input type="text" class='searchInput'>
  </div>
</template>

<script>

export default {
  name: 'Products',
  data() {
    return {
      brands: ['Barco', 'Analog Way', 'RGBLink', 'Magnimage', 'VDWALL', 'NovaStar']
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.productBrand {
  margin: 0 auto;
  .brand {
    margin-right: 20px;
  }
  .searchInput {
    border-radius: 10px;
    border: transparent;
  }
}
</style>
