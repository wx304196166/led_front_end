<template>
  <div class="banner">
    <img :src="banner">
  </div>
</template>

<script>
import banner from '@/assets/img/banner.png';
export default {
  name: 'Banner',
  data() {
    return { banner };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner{
  img{
    width: 100%;
    height: auto;
  }
}
</style>
