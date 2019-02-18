<template>
  <div class="dashboard">
    <div id="myCarousel" style="position:relative">
      <ul class="html5zoo-slides" style="display:none;">
        <li v-for="item in imgList" :key="item"><img :src="item" /></li>
      </ul>
    </div>
    <div class="bg about" :style="{backgroundImage:`url(${About})`}">
      <div>
        <!-- <h1>About us!</h1> -->
        <div class="aboutUs">
          <el-carousel :interval="4000" height="150px" arrow="never">
            <el-carousel-item v-for="item in aboutUsLIst" :key="item">
              {{item}}
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="aboutbox">
          <div class="divide">
            <h1>Passion</h1>
            <div class="imgBox"><img :src="About1" alt=""></div>
            Solution Integration
            <div class="describe">Provide you with an integrated solution</div>
          </div>
          <div class="divide">
            <h1>Performance</h1>
            <div class="imgBox"><img :src="About2" alt=""></div>
            Craftsman Spirit
            <div class="describe">Keep improving and constantly break through oneself</div>
          </div>
          <div class="divide">
            <h1>Professionalism</h1>
            <div class="imgBox"><img :src="About3" alt=""></div>
            Deep Service
            <div class="describe">Customize proprietary integration solution services for each us</div>
          </div>
          <div class="divide">
            <h1>Perfection</h1>
            <div class="imgBox"> <img :src="About4" alt=""> </div>
            Perfessional technology
            <div class="describe">hundreds of well-known strategic partners in the industry</div>
          </div>
        </div>
        <!-- <div class="submit">Watch more</div> -->
      </div>

    </div>
    <div class="case">
      <div @mouseenter="control=true" @mouseleave="control=false">
        <img :src="Case1" :class="{'img-hover':control}">
        <div class="mask cover" :style="{backgroundImage:`url(${mask})`}" :class="{'mask-hover':control}">
          <span class="title">This is a classic case</span>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, asperiores assumenda! Inventore labore officia possimus consequuntur eveniet! Quasi, quod aliquam quo dolor perspiciatis ducimus vero consequuntur, odio natus iure illum.</p>
        </div>
      </div>
      <div><img :src="Case2"></div>
      <div><img :src="Case3"></div>
    </div>
  </div>
</template>
<script>
import { play } from './play';

import Banner1 from '@/assets/img/home/banner1.jpg';
import Banner2 from '@/assets/img/home/banner2.jpg';
import Banner3 from '@/assets/img/home/banner3.jpg';
import About from '@/assets/img/home/aboutBg.png';
import Case1 from '@/assets/img/home/case1.png';
import Case2 from '@/assets/img/home/case2.png';
import Case3 from '@/assets/img/home/case3.png';
import About1 from '@/assets/img/home/about1.png';
import About2 from '@/assets/img/home/about2.png';
import About3 from '@/assets/img/home/about3.png';
import About4 from '@/assets/img/home/about4.png';
import mask from '@/assets/img/home/mask.png';
export default {
  name: 'Dashboard',
  data() {
    return {
      imgList: [Banner1, Banner2, Banner3,],
      aboutUsLIst: ['Xi’an Visual-Artisan is a leading international supplier, manufacturer and distributor of complete technology solutions to the live event, houses of worship, commercial, education and industrial sectors with the philosophy of providing only the highest quality, most technologically advanced solutions in order to ensure customer satisfaction and growth in North America, Europe, Middle East and Africa.','We are a dynamic, innovative company driven by passion, performance, professionalism and perfection. We believe that service, support, training, professional products and attitude are the foundations for customer satisfaction and company growth. “we supply the industry” is our company mission and aim. Supply means going far beyond simply selling products, it includes design, product service, training, technical support and more…'],
      screenHeight: window.innerHeight + 'px',
      About, Case1, Case2, Case3, About1, About2, About3, About4,
      mask,
      control: false
    };
  },
  mounted() {
    play();
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.case {
  display: flex;
  flex-direction: row;
  img {
    transform: scale(1, 1);
    transition: all 0.36s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  > div {
    width: 100% / 3;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background-color: #000;
  }
}
.submit {
  width: 14.2857rem;
  text-align: center;
  background: linear-gradient(74deg, #49007c, #e70088);
  color: #fafafa;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.7857rem;
  margin: 50px auto 0;
}
.about {
  height: 42.2857rem;
  color: #fff;
  > div {
    margin: 0 auto;
    width: 60%;
    overflow: hidden;
  }
  h1 {
    text-align: center;
    padding: 30px 0 20px 0;
  }
  .aboutUs {
    opacity: 0.6;
    line-height: 40px;
    margin-top:50px;
  }
  .aboutbox {
    display: flex;
    flex-direction: row;
    & > span {
      display: inline-block;
      width: 10%;
      height: 170px;
    }
    .divide {
      width: 25%;
      text-align: center;
      .imgBox {
        width: 30%;
        margin: 0 auto 20px;
      }
      .describe {
        padding: 0 5px;
        margin-top: 10px;
        text-align: left;
        opacity: 0.3;
      }
    }
  }
}
img {
  width: 100%;
  height: auto;
  vertical-align: top;
}
.mask {
  position: absolute;
  bottom: 120px;
  transform: translateY(100%);
  left: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 70px;
  transition: all 0.36s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  color: #fff;
  .title {
    font-size: 1.4286rem;
    line-height: 40px;
    font-weight: 700;
  }
  p {
    text-align: left;

    padding: 0 0.7143rem;
    font-size: 1.1429rem;
    line-height: 25px;
  }
}
.case {
  .img-hover {
    transform: scale(1.2, 1.2);
  }
  .mask-hover {
    bottom: 0;
    transform: translateY(0);
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.dashboard {
  .el-carousel__indicator {
    padding: 0 10px;
    .el-carousel__button {
      width: 13px;
      height: 13px;
      border-radius: 50%;
    }
  }
  .html5zoo-nav-0,
  .html5zoo-nav-1,
  .html5zoo-nav-2,
  .html5zoo-nav-3 {
    bottom: 7%;
    left: calc(50% - 36px);
  }
  .html5zoo-watermark-0,
  .html5zoo-watermark-1,
  .html5zoo-watermark-2,
  .html5zoo-watermark-3 {
    display: none;
  }
}
</style>