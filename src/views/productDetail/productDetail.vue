<template>
  <div>
    <banner />
    <div class="page-container">
      <ul class="intro clearfix">
        <li class="show-box">
          <div class="img-main">
            <img :src="cururl" />
          </div>
          <ul class="img-list">
            <li :class="{disabled:moveDisabled||preDisabled}" @click="move('left')" />
            <li>
              <ul :style="{transform:`translateX(${distanse*6.3714}rem)`}" class="img-box">
                <li v-for="(item,index) in urlList" :key="index"><img :src="item.url" :class="{active:item.active}" @click="sel(index,'url')" /></li>
              </ul>
            </li>
            <li :class="{disabled:moveDisabled||nextDisabled}" @click="move('right')" />
          </ul>
        </li>
        <li class="blank" />
        <li class="describe-box">
          <div class="title">
            {{name}}
            <!-- <i class="collect" /> -->
          </div>
          <ul class="specifications clearfix">
            <li>
              Specifications:
            </li>
            <li>
              <span v-for="(item, index) in specList" :key="index" :class="{active:item.active}" @click="sel(index,'spec')">{{item.spec}}</span>
            </li>
          </ul>
          <p class="describe">
            {{intro}}
          </p>
          <div v-if="isMain" @click="jump" class="btn">Integrate</div>
        </li>
      </ul>
      <ul class="detail-box clearfix">
        <li class="related">
          <related :ids="related" @get-item="switchProduct" />
        </li>
        <li class="blank">&emsp;</li>
        <li class="detail">
          <div class="tab">Commodity Introduction</div>
          <div class="content" v-html="detail">

          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import related from '@/components/Related/related';
import banner from '@/components/Banner/banner';
import { queryOne } from '@/api/common';
export default {
  name: 'ProductDetail',
  components: { related, banner },
  data() {
    return {
      name: '',
      intro: '',
      urlList: [],
      imgPath: '/upload/product/',
      isMain: false,
      detail: '',
      productId: null,
      distanse: 0,
      preDisabled: true,
      nextDisabled: false,
      specList: [],
      curspec: null,
      cururl: null,
      related: []
    };
  },
  computed: {
    moveDisabled() {
      return this.urlList.length < 5;
    }
  },
  created() {
    this.productId = this.$route.params.id;
    queryOne('product', this.productId).then(res => {
      if (res.data) {
        const data = res.data;
        data.img_list = data.img_list ? data.img_list.split(',') : [];
        data.specifications = data.specifications ? data.specifications.split(',') : [];
        this.name = data.name;
        this.intro = data.intro;
        this.isMain = Boolean(data.is_main);
        this.related = data.product_id ? data.product_id.split(',') : [];
        this.detail = data.detail;
        this.urlList = data.img_list.map(item => {
          const obj = { url: this.imgPath + item };
          this.$set(obj, 'active', false);
          return obj;
        });
        this.sel(0, 'url');
        this.specList = data.specifications.map(item => {
          const obj = { spec: item };
          this.$set(obj, 'active', false);
          return obj;
        });
      } else {
        this.$alert('Can not find Product By this ID!', 'Tip', {
          confirmButtonText: 'ok',
          callback: () => {
            this.$router.push({ path: '/dashboard' });
          }
        });
      }
    })
  },
  methods: {
    jump() {
      if (!this.curspec) {
        this.$message.info('Don\'t forget select the specification');
        return;
      }
      this.$router.push({ path: '/integration', query: { productId: this.productId, spec: this.curspec } });
    },
    switchProduct(product) {
      this.$router.push({ path: '/productDetail/' + product.id });
      this.$router.go(0);
    },
    sel(index, type) {
      this[type + 'List'].forEach((item, i) => {
        if (i === index) {
          item.active = true;
          this['cur' + type] = item[type];
        } else {
          item.active = false;
        }
      })
    },
    move(direction) {
      if (this.moveDisabled) { return; }
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
          if (this.urlList.length - Math.abs(this.distanse) >= 5) {
            this.distanse--;
            if (this.urlList.length - Math.abs(this.distanse) >= 5) {
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
    position: relative;
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
    .btn {
      position: absolute;
      bottom: 22px;
      left: 0;
      padding: 8px 15px;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      background: #686868;
      color: #fafafa;
      border-radius: 4px;
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
