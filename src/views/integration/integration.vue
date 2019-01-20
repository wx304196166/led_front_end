<template>
  <ul class="page-container clearfix">
    <li class="show-box clearfix">
      <ul class="show clearfix">
        <li class="title">Led Colourful HD Display</li>
        <li class="img-box bg"></li>
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
              <div class="number">900 CM</div>
              <div class="bar">
                <div />
              </div>
            </li>
            <li class="screen">
              <div class="bg" v-for="item in 9" :key="item"/>
            </li>
          </ul>
          <div class="x clearfix">
            <div class="bar">
              <div />
            </div>
            <div class="number">
              1000 CM
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
    <li class="parms-table">
      <table>
        <thead>
          <tr>
            <th>Classification</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
      </table>
    </li>
    <li class="submit pointer">
      <div>Submit</div>
    </li>
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
        { name: 'vertical', value: 3, unit: '' }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark: #333;
$bright: #fafafa;
.show-box {
  height: 35.7143rem;
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
      background-image: url("../../assets/img/img_led01.png");      
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
      width: calc(100% - 3.5714rem);
      margin-left: 3.5714rem;
      height: 38px;
      line-height: 38px;
      > ul {
        flex: 1;
        display: flex;
        justify-content:center;
      }
      .slider {
        width: 33%;
      }
    }
    .screen-box {
      height: calc(100% - 3.5714rem);
      padding-top: 3.5714rem;
      > ul {
        height: calc(100% - 3.5714rem);
        > li {
          float: left;
          height: 100%;
        }
      }
      .screen {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 3.5714rem);
        height: 100%;
        > div {
          width: (100% / 3);
          height: (100% / 3);
          background-image: url('../../assets/img/img_led02.png');
        }
      }
    }
    .bar {
      position: relative;
      > div {
        position: absolute;
        background: $dark;
      }
    }
    .number {
      text-align: center;
    }
    .x {
      height: 3.5714rem;
      padding-left: 3.5714rem;
      > div {
        float: left;
        height: 100%;
      }
      .bar {
        width: calc(50% - 3.5714rem);
        > div {
          height: 1px;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
      .number {
        width: 7.1429rem;
        line-height: 3.5714rem;
      }
    }
    .y {
      width: 3.5714rem;
      height: 100%;
      .bar {
        height: calc(50% - 3.5714rem);
        > div {
          width: 1px;
          height: 100%;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }
      }
      .number {
        height: 7.1429rem;
        line-height: 3.5714rem;
        writing-mode: tb;
      }
    }
  }
  .related {
    width: 19%;
  }
}
.parms-table{
  // #e70088 粉色的字
}
.submit{
  text-align: center;
  >div{
    display: inline-block;
    width: 14.2857rem;
    text-align: center;
    background: linear-gradient(74deg, #49007c, #e70088); 
    color: $bright;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.7857rem;
  }
}
</style>
