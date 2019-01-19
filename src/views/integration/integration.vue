<template>
  <ul class="clearfix">
    <li class="show-box clearfix">
      <ul class="show clearfix">
        <li>Led Colourful HD Display</li>
        <li></li>
        <li>Specifications: <span>200*300</span></li>
        <li>
          Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis.
        </li>
      </ul>
      <div class="blank"></div>
      <ul class="operate clearfix">
        <li></li>
        <li></li>
      </ul>
      <div class="blank"></div>
      <div class="related">
        <related />
      </div>
    </li>
    <li class="parms-table"></li>
    <li class="submit"></li>
  </ul>
</template>

<script>
import related from '@/components/related/related';
export default {
  name: 'Integration',
  components: { related }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.show-box {
  height: 800px;
  > ul,
  > div {
    float: left;
    height: 100%;
  }
  .blank {
    width: 1.5%;
  }
  .show {
    width: 21%;
  }
  .operate {
    width: 57%;
  }
  .related {
    width: 19%;
  }
}
</style>
