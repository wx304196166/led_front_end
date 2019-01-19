<template>
  <ul class="clearfix">
    <li class="show-box clearfix">
      <ul class="show clearfix">
        <li class="title">Led Colourful HD Display</li>
        <li class="img-box"></li>
        <li class="title">Specifications: <span class="spec">200*300</span></li>
        <li>
          Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis.
        </li>
      </ul>
      <div class="blank"></div>
      <ul class="operate clearfix">
        <li class="adjust">
          <ul v-for="item in adjust" :key="item.name" class="clearfix">
            <li>{{ item.name }}&nbsp;:&emsp;</li>
            <li class="slider">
              <el-slider v-model="item.value"></el-slider>
            </li>
            <li>&emsp;{{ item.value + item.unit }}</li>
          </ul>
        </li>
        <li class="screen-box">
          <ul class="clearfix">
            <li class="y">
              <div class="bar">
                <div />
              </div>
              <div class="number"></div>
              <div class="bar">
                <div />
              </div>
            </li>
            <li></li>
          </ul>
          <div class="x">
            <div class="bar">
              <div />
            </div>
            <div class="number">

            </div>
            <div class="bar">
              <div />
            </div>
          </div>
        </li>
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
  components: { related },
  data() {
    return {
      adjust: [
        { name: 'clearnce', value: 10, unit: 'mm' },
        { name: 'level', value: 2, unit: '' },
        { name: 'clearnce', value: 3, unit: '' }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark: #333;
$bright: #fafafa;
.show-box {
  height: 57.1429rem;
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
    .title {
      font-size: 1.2857rem;
      font-weight: 700;
      height: 3.5714rem;
      line-height: 3.5714rem;
    }
    .img-box {
      height: 14.2857rem;
    }
    .spec {
      color: $bright;
      background: $dark;
      padding: 0 1rem;
    }
  }
  .operate {
    width: 57%;
    padding-top: 3.5714rem;
    .adjust {
      display: flex;
      height: 38px;
      line-height: 38px;
      > ul {
        flex: 1;
        > li {
          float: left;
        }
      }
      .slider {
        width: 33%;
      }
    }
    .screen-box {
      > ul {
        height: calc(100% - 3.5714rem);
        width: calc(100% - 3.5714rem);
        > li {
          float: left;
          height: 100%;
        }
      }
    }
    .bar{
      position: relative;
    }
    .x {
      height: 3.5714rem;
      padding-left: 3.5714rem;
      .bar{
        width: calc(50% - 3.5714rem);
        >div{
          height: 1px;
          position: absolute;
          background: $dark;
          top:50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
      .number{
        width: 7.1429rem;
      }
    }
    .y {
      width: 3.5714rem;
    }
  }
  .related {
    width: 19%;
  }
}
</style>
