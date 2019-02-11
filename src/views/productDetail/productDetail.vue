<template>
  <div>
    <banner />
    <div class="page-container">
      <ul class="intro clearfix">
        <li class="show-box">
          <img :src="product1" alt="">
          <ul class="img-list">
            <li :class="{disabled:moveDisabled||preDisabled}" @click="move('left')" />
            <li>
              <ul :style="{transform:`translateX(${distanse*6.3714}rem)`}" class="img-box">
                <li v-for="(item,index) in productImgList" :key="index"><img :src="product1" /></li>
              </ul>
            </li>
            <li :class="{disabled:moveDisabled||nextDisabled}" @click="move('right')" />
          </ul>
        </li>
        <li class="blank" />
        <li class="describe-box">
          <div class="title">
            Led Colourful HD Display
            <!-- <i class="collect" /> -->
          </div>
          <ul class="specifications clearfix">
            <li>
              Specifications:
            </li>
            <li>
              <span v-for="(item, index) in specList" :key="index" :class="{active:item.active}" @click="sel(index)">{{item.spec}}</span>
            </li>
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
          <div class="tab">Commodity Introduction</div>
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
      selector: {
        width: 166,
        halfWidth: 83,
        top: 0,
        left: 0,
        bgTop: 0,
        bgLeft: 0,
        rightBound: 0,
        bottomBound: 0,
        absoluteLeft: 0,
        absoluteTop: 0
      },
      imgInfo: {},
      hideOutShow: true,
      imgLoadedFlag: false,
      screenWidth: document.body.clientWidth,
      timer: null,
      num1: 0,
      product1,
      productImgList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      distanse: 0,
      preDisabled: true,
      nextDisabled: false,
      specList: ['200*300', '300*400', '400*500', '500*400', '400*300', '300*200'],
      curSpec: null,
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
  props: {
    highUrl: String,
    type: {
      type: String,
      default: 'square',
      validator: function (value) {
        return ['circle', 'square'].indexOf(value) !== -1;
      }
    },
    scale: {
      type: Number,
      default: 3
    },
    moveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    leaveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    hideZoom: {
      type: Boolean,
      default: false
    },
    outShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    moveEvent(e) {
      this.mouseMove(e);
    },
    leaveEvent(e) {
      this.mouseLeave(e);
    },
    url() {
      this.imgLoadedFlag = false;
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = setTimeout(() => {
          this.imgLoaded();
          clearTimeout(this.timer);
          this.timer = null;
        }, 400);
      }
    }
  },
  computed: {
    imgSelectorPosition() {
      let { top, left } = this.selector;
      return {
        top: `${top}px`,
        left: `${left}px`
      };
    },
    imgSelectorSize() {
      let width = this.selector.width;
      return {
        width: `${width}px`,
        height: `${width}px`
      };
    },
    imgOutShowSize() {
      let {
        scale,
        selector: { width }
      } = this;
      return {
        width: `${width * scale}px`,
        height: `${width * scale}px`
      };
    },
    imgSelectorBg() {
      let {
        scale,
        url,
        highUrl,
        imgInfo: { height, width }
      } = this;
      return {
        backgroundImage: `url(${product1})`,
        backgroundSize: `${width * scale}px ${height * scale}px`
      };
    },
    imgBgPosition() {
      let { bgLeft, bgTop } = this.selector;
      return {
        backgroundPosition: `${bgLeft}px ${bgTop}px`
      };
    },
    moveDisabled() {
      return this.productImgList.length < 5;
    },
    map() {
      return this.$store.getters.map;
    }
  },
  created() {
    this.specList = this.specList.map(item => {
      const obj = { spec: item };
      this.$set(obj, 'active', false);
      return obj;
    });
  },
  methods: {
    imgLoaded() {
      let imgInfo = this.$refs['img'].getBoundingClientRect();
      if (JSON.stringify(this.imgInfo) == JSON.stringify(imgInfo)) {  // 位置不变不更新
        return;
      }
      this.imgLoadedFlag = true;
      let { width, height, left, top } = (this.imgInfo = imgInfo);
      let selector = this.selector;
      let { width: selectorWidth, halfWidth: selectorHalfWidth } = selector;
      let { scrollLeft, scrollTop } = document.documentElement;
      selector.rightBound = width - selectorWidth;
      selector.bottomBound = height - selectorWidth;
      selector.absoluteLeft = left + selectorHalfWidth + scrollLeft;
      selector.absoluteTop = top + selectorHalfWidth + scrollTop;
    },
    reset() {
      Object.assign(this.selector, {
        top: 0,
        left: 0,
        bgLeft: 0,
        bgTop: 0
      });
    },

    sel(index) {
      this.specList.forEach((item, i) => {
        if (i === index) {
          item.active = true;
          this.curSpec = item.spec;
        } else {
          item.active = false;
        }
      })
    },
    move(direction) {
      if (this.moveDisabled) { return }
      switch (direction) {
        case 'left':
          if (Math.abs(this.distanse) > 0) {
            this.distanse++;
            if (Math.abs(this.distanse) > 0) {
              this.preDisabled = false;
              this.nextDisabled = true;
            } else {
              this.preDisabled = true;
              this.nextDisabled = false;
            }
          }
          break;
        case 'right':
          if (this.productImgList.length - Math.abs(this.distanse) >= 5) {
            this.distanse--;
            if (this.productImgList.length - Math.abs(this.distanse) >= 5) {
              this.nextDisabled = false;
              this.preDisabled = true;
            } else {
              this.nextDisabled = true;
              this.preDisabled = false;
            }
          }
          break;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.img-container {
  position: relative;
}

.img-selector {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  background-repeat: no-repeat;
  cursor: crosshair;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.img-selector.circle {
  border-radius: 50%;
}

.img-out-show {
  position: absolute;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  transform: translate(100%, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
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
    width: 35rem;
    .img-main {
      position: relative;
      height: calc(100% - 80px);
      border: 1px solid #000;
      img {
        display: block;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: auto;
      }
      .pic-span {
        display: none;
        position: absolute;
        cursor: move;
        width: 200px;
        height: 200px;
        // background: url(../img/pic-span.png);
        left: 0px;
        top: 0px;
        z-index: 1;
      }
      .big-pic {
        width: 400px;
        height: 400px;
        overflow: hidden;
        background: white;
        position: absolute;
        left: 410px;
        top: 0;
        display: block;
      }
      .big-pic > img {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .img-list {
      height: 80px;

      > li {
        float: left;
        height: 100%;
        width: calc(100% - 44px);
        overflow: hidden;
        position: relative;
      }

      > li:nth-child(1),
      > li:nth-child(3) {
        width: 22px;
        background-image: url("../../assets/img/next.png");
        background-repeat: no-repeat;
        background-position: center center;
        cursor: pointer;
        &:hover {
          background-image: url("../../assets/img/hover_next.png");
        }
      }
      > li:nth-child(1),
      > li:nth-child(3) {
        &.disabled {
          background-image: url("../../assets/img/next.png");
        }
      }
      > li:nth-child(1) {
        transform: scale(-1, 1);
      }
    }
    .img-box {
      height: 100%;
      transition: transform 0.38s ease;
      white-space: nowrap;
      > li {
        display: inline-block;
        height: 100%;
        width: 6.3714rem;
        position: relative;

        > img {
          position: absolute;
          cursor: pointer;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3.9286rem;
          height: 3.5714rem;
          padding: 1px;
          border: 1px solid #cecfce;
          &:hover,
          &.active {
            border-color: #000;
          }
        }
      }
    }
  }

  .describe-box {
    width: calc(93% - 35rem);

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
    .specifications {
      font-size: 16px;
      margin-top: 20px;
      > li {
        float: left;
      }

      > li:first-child {
        width: 125px;
        font-weight: 700;
      }

      > li:last-child {
        width: calc(100% - 125px);
        > span {
          float: left;
          font-size: 14px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #000;
          padding: 3px 8px;
          border-radius: 1px;
          cursor: pointer;
          &:hover,
          &.active {
            color: #fafafa;
            background: #000;
          }
        }
      }
    }

    .describe {
      text-indent: 2em;
      margin-top: 10px;
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
