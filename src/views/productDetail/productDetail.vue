<template>
  <div>
    <banner />
    <div class="page-container">
      <ul class="intro clearfix">
        <li class="show-box">
          <div class="img-main full-pic" @mousemove="mouseMovePic()" @mouseout="mouseOutPic()">
            <img :src="product1" alt="" class="normalPic">
            <span class="pic-span"></span>
            <div class="big-pic">
              <img src="product1" alt="" class="bigPic">
            </div>
          </div>
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
  computed: {
    moveDisabled() {
      return this.productImgList.length < 5;
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
    mouseMovePic(evt) {
      const pic_div = document.getElementsByClassName('full-pic');//拿到整个大的div
      const normal_pic = document.getElementsByClassName('normalPic');//拿到div中的图片
      const span_move = document.getElementsByClassName('pic-span');//拿到显示当前图片位置的span
      const big_div = document.getElementsByClassName('big-pic');//拿到右边放置放大图片的div
      const pic_move = document.getElementsByClassName('bigPic');//拿到右侧放大的图片本身
      // 获取事件
      const e = evt || window.event;
      // 获取大图和小图之间的倍数     
      const bigSize = pic_move.offsetHeight;
      const littleSize = normal_pic.offsetHeight;
      const n = bigSize / littleSize;
      //获取pic对于页面的绝对位置
      const pic_x = normal_pic.getBoundingClientRect().left;
      const pic_y = normal_pic.getBoundingClientRect().top + document.documentElement.scrollTop;
      // 获取鼠标相对full-pic的位置
      const mouse_x = e.pageX - pic_x;
      const mouse_y = e.pageY - pic_y;
      //将两个div的设置为显示
      big_div.style.display = 'block';
      span_move.style.display = 'block';
      span_move.style.width = normal_pic.offsetWidth / 2 + 'px';
      span_move.style.height = normal_pic.offsetWidth / 2 + 'px';
      //设置边际以及图片移动的算法
      if (mouse_x <= span_move.offsetWidth / 2) {
        //在最左侧不发生移动的情况
        pic_move.style.left = '0px';//右边大图位置为0px
        span_move.style.left = normal_pic.offsetLeft + 'px';//span始终和图片左端对齐
      } else if (mouse_x > span_move.offsetWidth / 2 && mouse_x < normal_pic.offsetWidth - span_move.offsetWidth / 2) {
        const tempX = mouse_x - span_move.offsetWidth / 2;
        pic_move.style.left = -n * (tempX) + 'px';//控制右侧大图的移动
        span_move.style.left = tempX + normal_pic.offsetLeft + 'px';//控制span位置的移动
      } else {
        //当移动到最右端的时候，停止span的移动，大图也移动到相应的最右端，此时可以通过一个n来控制大图的移动了
        pic_move.style.left = -n * (normal_pic.offsetWidth - span_move.offsetWidth) + 'px';
        span_move.style.left = normal_pic.offsetLeft + normal_pic.offsetWidth - span_move.offsetWidth + 'px';
      }
      if (mouse_y <= span_move.offsetWidth / 2) {
        pic_move.style.top = '0px';
        span_move.style.top = '0px';
      } else if (mouse_y > span_move.offsetHeight / 2 && mouse_y < normal_pic.offsetHeight - span_move.offsetHeight / 2) {
        var tempY = mouse_y - span_move.offsetHeight / 2;
        pic_move.style.top = - n * tempY + 'px';
        span_move.style.top = tempY + 'px';
      } else {
        pic_move.style.top = -(n - 1) * normal_pic.offsetHeight + 'px';
        span_move.style.top = normal_pic.offsetHeight - span_move.offsetHeight + 'px';
      }
    }
  },
  mouseOutPic() {
    const span_move = document.getElementsByClassName('pic-span');//拿到显示当前图片位置的spanF
    const big_div = document.getElementsByClassName('big-pic');//拿到右边放置放大图片的div
    span_move.style.display = 'none';
    big_div.style.display = 'none';
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
