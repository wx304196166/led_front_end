<template>
<div class="productBrand">
        <span>brand:</span>
        <span v-for="(item,index) in brands" :key="index">{{item}}</span>
      </div>
</template>

<script>

export default {
  name: 'Products',
  data() {
    return {
      brands: ['brand1', 'brand2', 'brand3']
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.productBrand {
  margin: 0 auto;
}
</style>
