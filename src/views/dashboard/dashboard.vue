<template>
  <div>
    <img :src="Banner">
  </div>
</template>

<script>
import Banner from '@/assets/img/home/banner.png';

export default {
  name: 'Dashboard',
  data() {
    return { Banner };
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img{
  width: 100%;
  height: auto;
  transform: scale(0.5);
}
</style>
