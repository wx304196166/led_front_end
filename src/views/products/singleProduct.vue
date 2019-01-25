<template>
  <div class="product pointer">
    <router-link to="/productDetail">
      <img :src="productPng" alt="">
      <div class="productSummary">
        <p class="title">{{ info.title }}</p>
        <p class="content">{{ info.summary }}</p>
      </div>
    </router-link>
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
  margin-bottom: 1.4286rem;
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
      background-color: #e3158c;
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
    .title {
      font-size: 1.1429rem;
      line-height: 1.7857rem;
      font-weight: 700;
      text-align: center;
    }
    .content {
      padding: 0 0.7143rem;
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
