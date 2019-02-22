<template>
  <div>
    <div id="map_div"></div>
    <div class="page-container box">
      <div class="marginTop">Headquarters</div>
      <div>T: +86 13109563986</div>
      <div>F: +86 (0)29 84187879</div>
      <div>Room 11928, Unit 1, Building2, I-City Block,</div>
      <div>No. 11 of Tang Yan South Road,</div>
      <div>Zhangba Street office, Hi-tech zone, Xi'an, Shaanxi</div>
      <div class="marginTop">Warehouse</div>
      <div>T: +86 185 9193 2311</div>
      <div>NO.13 E&T DEVELOPING ZONE FENGCHENG TWO STREET,XI'AN CHINA</div>
    </div>
  </div>
</template>

<script>
import { setMap } from './amap.js';
export default {
  name: 'About',
  mounted() {
    setMap();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style.scss";
#map_div {
  width: 100%;
  height: 400px;
  margin-top: 70px;
}
</style>
<style>
.amap-icon img {
  width: 25px;
  height: 34px;
}

.amap-marker-label {
  border: 0;
  background-color: transparent;
}

.info {
  position: relative;
  top: 0;
  right: 0;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
}
</style>

