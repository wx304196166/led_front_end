<template>
  <div class="product">
    <img :src="product" alt="">
    <div class="Summary">
      <h3>{{ info.title }}</h3>
      {{ info.summary }}
    </div>
  </div>
</template>

<script>
import product from '@/assets/img/product.png';

export default {
  name: 'SingleProduct',
  props: {
    info: {
      type: Object,
      default: function () { return {} }
    }
  },
  data() {
    return {
      product
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.productContainer {
  max-width: 1200px;
  margin: 0 auto;
  .productList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .product {
      position: relative;
      width: 360px;
      margin: 20px;
      height: 200px;
      .productSummary {
        position: absolute;
        bottom: 0;
        height: 50%;
        width: 100%;
        background-color: #eee;
      }
      i,
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        // background: url('../../style/imgs/product.png') no-repeat 0 0;
      }
    }
  }
}
</style>
