<template>
  <div class="productBrand">
    <span>Brand:</span>
    <span v-for="(item,index) in brands" :key="index" class='brand'>{{item}}</span>
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
}
</style>
