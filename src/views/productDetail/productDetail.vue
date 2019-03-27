<template>
  <div style="position:relative">
    <banner/>
    <div class="page-container">
      <ul class="intro clearfix">
        <li class="show-box">
          <div class="img-main" ref="box">
            <img :src="cururl">
            <div
              v-show="show"
              class="drag-block"
              :style="{left:dragX+'px',top:dragY+'px',width:dragW+'px',height:dragH+'px'}"
            ></div>
          </div>
          <div :class="{show}" class="scale-box">
            <!-- <img :src="cururl" :style="{left:`-${dragX*ratio}px`,top:`-${dragY*ratio}`}"> -->
            <img
              :src="cururl"
              :style="{transform:`translate(-${dragX*ratio}px,-${dragY*ratio}px)`}"
            >
          </div>
          <ul class="img-list">
            <li :class="{disabled:moveDisabled||preDisabled}" @click="move('left')"/>
            <li>
              <ul :style="{transform:`translateX(${distanse*6.3714}rem)`}" class="img-box">
                <li v-for="(item,index) in urlList" :key="index">
                  <img :src="item.url" :class="{active:item.active}" @click="sel(index,'url')">
                </li>
              </ul>
            </li>
            <li :class="{disabled:moveDisabled||nextDisabled}" @click="move('right')"/>
          </ul>
        </li>
        <li class="blank"/>
        <li class="describe-box">
          <div class="title">
            {{name}}
            <i class="collect" @click="toggleShare"/>
          </div>
          <ul class="specifications clearfix">
            <li>
              <span
                v-for="(item, index) in specList"
                :key="index"
                :class="{active:item.active}"
                @click="sel(index,'spec')"
              >{{item.spec}}</span>
            </li>
          </ul>
          <div class="describe" v-html="intro"/>
          <!-- <div v-if="isMain" @click="jump" class="btn">Integrate</div> -->
        </li>
      </ul>

      <div v-html="detail" class="detail-box"/>
    </div>
  </div>
</template>

<script>
// import related from "@/components/Related/related";


import banner from "@/components/Banner/banner";
import { getProductDetail } from "@/api/product";
export default {
  name: "ProductDetail",
  components: { banner },
  data() {
    return {
      name: "",
      intro: "",
      urlList: [],
      // isMain: false,
      detail: "",
      productId: null,
      distanse: 0,
      preDisabled: true,
      nextDisabled: false,
      specList: [],
      curspec: null,
      cururl: null,
      // related: [],
      show: false,
      dragX: 0,
      dragY: 0,
      dragW: 245,
      dragH: 196,
      ratio: 1
    };
  },
  computed: {
    moveDisabled() {
      return this.urlList.length < 5;
    },
    imgY() {
      return 67.5 / this.ratio;
    }
  },
  created() {
    this.productId = this.$route.params.id;
    getProductDetail(this.productId).then(res => {
      if (res.data) {
        const data = res.data;
        data.img_list = data.img_list ? data.img_list.split(",") : [];
        data.specifications = data.specifications
          ? data.specifications.split(",")
          : [];
        this.name = data.name;
        this.intro = data.brief;
        // this.isMain = Boolean(data.is_main);
        // this.related = data.product_id ? data.product_id.split(",") : [];
        this.detail = data.intro;
        const imgList = (data.image && data.image.split(",")) || [];
        this.urlList = imgList.map(item => {
          const obj = { url: item };
          this.$set(obj, "active", false);
          return obj;
        });
        this.sel(0, "url");
        this.setRatio();
        this.specList = data.specifications.map(item => {
          const obj = { spec: item };
          this.$set(obj, "active", false);
          return obj;
        });
      } else {
        this.$alert("Can not find Product By this ID!", "Tip", {
          confirmButtonText: "ok",
          callback: () => {
            this.$router.push({ path: "/dashboard" });
          }
        });
      }
    });
  },
  mounted() {
    this.$refs.box.onmouseenter = e => {
      e.preventDefault();
      this.show = true;
      this.$refs.box.onmousemove = this.zoom;
    };
    this.$refs.box.onmouseleave = () => {
      this.show = false;
    };
  },
  methods: {
    toggleShare(){
      this.$store.dispatch('ToggleShare');
    },
    zoom(e) {
      const width = document.body.clientWidth;
      const offsetX = width * 0.06;
      const offsetY = (width * 385) / 1920 + 3;

      // 产品展示框基础宽高
      const BoxW = 490;
      const BoxH = 392;
      //显示鼠标指针的位置，-100让鼠标位置出现在div的中间
      var x = e.pageX - offsetX - this.dragW / 2;
      var y = e.pageY - offsetY - this.dragH + 10;

      if (x >= BoxW - this.dragW) {
        x = BoxW - this.dragW;
      }
      if (y >= BoxH - this.dragH) {
        y = BoxH - this.dragH;
      }
      if (x <= 0) {
        x = 0;
      }
      if (y <= 0) {
        y = 0;
      }
      this.dragX = x;
      this.dragY = y;
    },
    setRatio() {
      // 创建对象
      var img = new Image();

      // 改变图片的src
      img.src = this.cururl;

      // 判断是否有缓存
      if (img.complete) {
        this.ratio = img.width / 490;
        this.setDragBlock();
      } else {
        // 加载完成执行
        img.onload = () => {
          this.ratio = img.width / 490;
          this.setDragBlock();
        };
      }
    },
    setDragBlock() {
      // 产品展示框基础宽高
      const BoxW = 490;
      const BoxH = 392;
      this.dragW = BoxW / this.ratio;
      this.dragH = BoxH / this.ratio;
    },
    jump() {
      if (!this.curspec) {
        this.$message.info("Don't forget select the specification");
        return;
      }
      this.$router.push({
        path: "/integration",
        query: { productId: this.productId, spec: this.curspec }
      });
    },
    sel(index, type) {
      this[type + "List"].forEach((item, i) => {
        if (i === index) {
          item.active = true;
          this["cur" + type] = item[type];
        } else {
          item.active = false;
        }
      });
    },
    move(direction) {
      if (this.moveDisabled) {
        return;
      }
      switch (direction) {
        case "left":
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
        case "right":
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
  height: 513px;
  border-bottom: 1px solid #ccc;

  > li {
    float: left;
    height: 100%;
  }

  .show-box {
    position: relative;
    width: 35rem;
    .img-main {
      position: relative;
      height: calc(100% - 80px);
      border: 1px solid #999;
      img {
        max-width: 100%;
        max-height: 100%;
        /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); */
      }
    }
    .drag-block {
      width: 50%;
      height: 50%;
      position: absolute;
      background: #000;
      opacity: 0.3;
    }
    .scale-box {
      width: 35rem;
      height: 392px;
      position: absolute;
      top: 0;
      left: 35.2rem;
      overflow: hidden;
      background: #fff;
      z-index: 20;
      transition: 0.24s all ease-out;
      opacity: 0;
      visibility: hidden;
      /* > img {
        position: absolute;
      } */
    }
    .show {
      opacity: 1;
      visibility: visible;
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
    overflow-y: auto;
    .title {
      font-size: 28px;
      font-weight: 700;
      height: 30px;
      line-height: 30px;

      .collect {
        float: right;
        cursor: pointer;
        background: url("../../assets/img/collect.png") no-repeat center center;
        background-size: 100% auto;
        width: 31px;
        height: 31px;
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
  padding: 20px 5px;
}
</style>
