<template>
  <div>
    <banner />

    <div class="page-container">
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
import banner from '@/components/Banner/banner';

export default {
  name: 'Products',
  components: { SingleProduct, Divide ,banner},
  data() {
    return {
      products: [
        {
          photo: '',
          title: 'led2',
          summary: '时代峰峻客户水电费时代峰峻客户水电费时代峰峻客户水电费时代峰峻客户水电费时代峰峻客户水电费时代峰峻客户水电费时代峰峻客户水电费'
        },
        {
          photo: '',
          title: '啊目的',
          summary: 'sdfxcvsdf'
        },
        {
          photo: '',
          title: 'led2',
          summary: '时代峰峻客户水电费'
        },
        {
          photo: '',
          title: 'led2',
          summary: 'sdfxcvsdfwersdfsfxcv     sdfxvsdf'
        },
        {
          photo: '',
          title: 'led2',
          summary: '时代峰峻客户水电费'
        }
      ]
    };
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.photo {
  border: 1px solid #000;
  height: 200px;
  margin-bottom: 20px;
}
.productList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .product {
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
</style>
