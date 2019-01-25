<template>
  <div>
    <banner />
    <div class="page-container">
      <ul class="intro clearfix">
        <li class="show-box">
          <div><img :src="product1" /></div>
          <ul class="img-list">
            <li />
            <li>
              <ul class="img-box">
                <li><img :src="product1" /></li>
              </ul>
            </li>
            <li />
          </ul>
        </li>
        <li class="blank" />
        <li class="describe-box">
          <div class="title">
            Led Colourful HD Display
            <!-- <i class="collect" /> -->
          </div>
          <ul class="specifications clearfix">
            <!-- <li>Number:
              <el-input-number v-model="num1" @change="handleChange" :min="0" :max="9999" size="mini">
              </el-input-number>
            </li> -->
            <li>Specifications:</li>
            <li />
          </ul>
          <p class="describe">
            Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis.
          </p>

        </li>
      </ul>
      <ul class="detail-box clearfix">
        <li class="related">
          <related :list="list" />
        </li>
        <li class="blank">&emsp;</li>
        <li class="detail">
          <div class="tab">Commodity introduction</div>
          <div class="content">
            Curabitur auctor tristique lobortis. Quisque bibendum, ipsum in feugiat pharetra, odio libero malesuada turpis, tempus fermentum augue est sit amet magna. Vestibulum bibendum lectus non mauris porta, sed blandit purus scelerisque. Sed consequat mollis ornare. Sed laoreet id dolor vitae facilisis. Mauris varius orci sed turpis commodo mattis. Cras vel nibh scelerisque urna tincidunt vestibulum accumsan pharetra ex. Proin ullamcorper eros non justo tincidunt lobortis. Ut sapien nisi, bibendum tempor efficitur ultricies, pellentesque interdum diam. Aliquam commodo felis eu urna consectetur, ut semper diam tempor. Etiam eu maximus sapien, a tristique tortor.
            <img :src="product1" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import related from '@/components/Related/related';
import banner from '@/components/Banner/banner';
import product1 from '@/assets/img/products/MCTRL4K.png';
// 调试用
import cardA8s from '@/assets/img/products/cardA8s.png';
import CVT4KS from '@/assets/img/products/CVT4K-S.png';
import VX4S from '@/assets/img/products/VX4S.png';
import MCTRLR5 from '@/assets/img/products/MCTRLR5.png';
export default {
  name: 'ProductDetail',
  components: { related, banner },
  data() {
    return {
      num1: 0,
      product1,
      list: [
        {
          id: 'cardA8s',
          name: 'cardA8s',
          classification: 'Sensor',
          brand: 'Card',
          imgUrl: cardA8s,
          specifications: [200, 400]
        },
        {
          id: 'CVT4K-S',
          name: 'CVT4K-S',
          classification: 'Sensor',
          brand: 'CVT4K',
          imgUrl: CVT4KS,
          specifications: [300, 400]
        },        
        {
          id: 'VX4S',
          name: 'all-in-one VX4S',
          classification: 'Consumables',
          imgUrl: VX4S,
          brand: 'all-in-one',
          specifications: [300, 400]
        },
        {
          id: 'MCTRLR5',
          name: 'MCTRLR5',
          classification: 'Consumables',
          imgUrl: MCTRLR5,
          brand: 'MCTRL',
          specifications: [200, 400]
        }
      ]
    };
  },
  methods: {
    handleChange(value) {

    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.intro,
.detail-box {
  padding: 20px 0;
}
.blank {
  width: 3.5%;
}
.intro {
  height: 500px;
  border-bottom: 1px solid #ccc;

  > li {
    float: left;
    height: 100%;
  }

  .show-box {
    width: 36.5%;
    > div {
      position: relative;
      height: calc(100% - 80px);
      border: 1px solid #000;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: auto;
      }
    }

    .img-list {
      height: 80px;

      > li {
        float: left;
        height: 100%;
        width: calc(100% - 44px);
        overflow: hidden;
      }

      > li:nth-child(1),
      > li:nth-child(3) {
        width: 22px;
        background-image: url("../../assets/img/next.png");
        background-repeat: no-repeat;
        background-position: center center;
      }
      > li.has:nth-child(1),
      > li.has:nth-child(3) {
        background-image: url("../../assets/img/hover_next.png");
      }
      > li:nth-child(1) {
        transform: scale(-1, 1);
      }
    }
    .img-box {
      height: 100%;
      > li {
        float: left;
        height: 100%;
        width: 62px;
        text-align: center;
        position: relative;
        float: left;
        > img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 50px;
          height: 50px;
          padding: 1px;
          border: 1px solid #cecfce;
        }
      }
    }
  }

  .describe-box {
    width: 59%;

    .title {
      font-size: 28px;
      font-weight: 700;
      height: 30px;
      line-height: 30px;

      > i {
        position: relative;
        top: 6px;
        margin-left: 1em;
        display: inline-block;
        background: url("../../assets/img/collect.png") no-repeat center center;
        width: 31px;
        height: 100%;
      }
    }

    .specifications,
    .describe {
      margin-top: 25px;
    }

    .specifications {
      > li {
        float: left;
      }

      > li:first-child {
        width: 80px;
      }

      > li:first-child {
        width: calc(100% - 80px);
      }
    }

    .describe {
      text-indent: 2em;
    }
  }
}

.detail-box {
  > li {
    float: left;
  }
  .blank,
  .detail {
    min-height: 535px;
  }

  .related {
    width: 200px;

    .title {
      font-size: 18px;
      font-weight: 700;
      line-height: 35px;
      color: #fefefe;
      background: #949494;
      text-align: center;
    }
    .list {
      background: #f5f5f5;
      min-height: 500px;
      .item {
        padding: 20px 15px;
        > div {
          width: 100%;
          height: 170px;
          border: 1px solid #000;
        }
        > p {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }
  }

  .detail {
    width: calc(96.5% - 200px);
    padding: 20px 0;
    .tab {
      font-size: 18px;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .content {
      padding: 20px 15px;
    }
  }
}
</style>
