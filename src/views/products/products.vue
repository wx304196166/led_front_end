<template>
  <div>
    <div class="productContainer">
      <divide />
      <div class="productList">
        <single-product v-for="(item,index) in products" :key="index" :info="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from './singleProduct';
import Divide from './brand/divide';

export default {
  name: 'Products',
  components: { SingleProduct, Divide },
  data() {
    return {
      products: [
        { photo: '', title: 'led2', summary: '时代峰峻客户水电费' },
        { photo: '', title: '啊目的', summary: 'sdfxcvsdf' },
        { photo: '', title: 'led2', summary: '时代峰峻客户水电费' },
        { photo: '', title: 'led2', summary: 'sdfxcvsdfwersdfsfxcv     sdfxvsdf' },
        { photo: '', title: 'led2', summary: '时代峰峻客户水电费' },
      ]
    }
  },

}
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
        // background: url("../../style/imgs/product.png") no-repeat 0 0;
      }
    }
  }
}
</style>
