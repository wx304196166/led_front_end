<template>
  <div class="product pointer" @click.stop="jump(info.id)">
      <img :src="info.thumbnail_pic" alt="">
      <div class="productSummary">
        <p class="title">{{ info.name }}</p>
        <!-- <p class="content">{{ info.intro }}</p> -->
      </div>
  </div>
</template>

<script>
export default {
  name: 'SingleProduct',
  props: {
    info: {
      type: Object,
      default: () => { return {}; }
    }
  }, 
  methods:{
    jump(id){
      this.$router.push({ path: '/productDetail/' + id });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.product {
  position: relative;
  margin-bottom: 1.4286rem;
  box-sizing: border-box;
  width: 25%;
  padding: 2% 3.5%;
  border: 1px solid transparent;
  overflow: hidden;
  img {
    width: 100%;
  }
  &:hover {
    // border: 1px solid #a549a5;
    border: 1px solid transparent;
    box-shadow: none;
    color: #fff;
    .productSummary {
      background: linear-gradient(to top, #6f007c, #e70088);;
      transform: translateY(-100%);
    }
  }
  .productSummary {
    position: absolute;
    top: 104%;
    left: 0;
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
