<template>
  <div class="product">
    <img :src="productPng" alt="">
    <div class="productSummary">
      <h3>{{ info.title }}</h3>
      <span class="summary">{{ info.summary }}</span>
    </div>
  </div>
</template>

<script>
import productPng from '@/assets/img/products/VX2S.png';
export default {
  name: 'SingleProduct',
  props: {
    info: {
      type: Object,
      default: () => { return {}; }
    }
  },
  data() {
    return {
      productPng
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.product {
  position: relative;
  box-sizing: border-box;
  width: 33.3%;
  border: 1px solid transparent;
  overflow: hidden;
  img {
    transform: scale(0.8);
  }
  &:hover {
    border: 1px solid #000;
    box-shadow: none;
    .productSummary {
      background-color: #E3158C;
      transform: translateY(-100%);
    }
  }
  .productSummary {
    position: absolute;
    top: 100%;
    transform: translateY(-50px);
    transition: 0.38s;
    width: 100%;
    padding-bottom: 10px;
    text-align: center;
    .summary {
      text-align: left;
    }
  }
  i,
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
