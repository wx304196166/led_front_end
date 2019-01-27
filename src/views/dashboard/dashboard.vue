<template>
  <div style="height:100%">
    <el-carousel :interval="4000" :height="screenHeight">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
    <div class="bg about" :style="{backgroundImage:`url(${About})`}">
      <div>
        <h1>About us!</h1>
        <div class="aboutUs">
          <el-carousel :interval="4000" height="150px" arrow="never">
            <el-carousel-item v-for="item in aboutUsLIst" :key="item">
              {{item}}
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="aboutbox">
          <div class="divide">
            <h1>MAJOR</h1>
            <div class="imgBox"><img :src="About1" alt=""></div>
            Solution Integration
            <div class="describe">Provide you with an integrated solution</div>
          </div>
          <div class="divide">
            <h1>EFFICIENCY</h1>
            <div class="imgBox"><img :src="About2" alt=""></div>
            Craftsman Spirit
            <div class="describe">Keep improving and constantly break through oneself</div>
          </div>
          <div class="divide">
            <h1> PERFECT</h1>
            <div class="imgBox"><img :src="About3" alt=""></div>
            Deep Service
            <div class="describe">Customize proprietary integration solution services for each us</div>
          </div>
          <div class="divide">
            <h1>SINCERE</h1>
            <div class="imgBox"> <img :src="About4" alt=""> </div>
            Perfessional technology
            <div class="describe">hundreds of well-known strategic partners in the industry</div>
          </div>
        </div>
        <!-- <div class="submit">Watch more</div> -->
      </div>

    </div>
    <div class="case">
      <span><img :src="Case1"></span>
      <span><img :src="Case2"></span>
      <span><img :src="Case3"></span>
    </div>
  </div>
</template>

<script>
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

export default {
  name: 'Dashboard',
  data() {
    return {
      imgList: [Banner1, Banner2, Banner3,],
      aboutUsLIst: [
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. totam id corporis eveniet odio eos ad distinctio, mollitia dignissimos commodi alias sed excepturi tempore. Eveniet doloribus nemo suscipit porro, ipsam doloremque quae maiores impedit provident nobis, exercitationem eius voluptatibus assumenda quia velit.',
        'unde quod sapiente perferendis magnam, fugiat totam id corporis eveniet odio eos ad distinctio, mollitia dignissimos commodi alias sed excepturi tempore. Eveniet doloribus nemo suscipit porro, ipsam doloremque quae maiores impedit provident nobis, quia velit.'],
      screenHeight: window.innerHeight + 'px',
      About, Case1, Case2, Case3, About1, About2, About3, About4    };
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.case {
  display: flex;
  flex-direction: row;
  span {
    width: 33.3%;
    // 因图片大小不一的临时方案
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
  & > div {
    margin: 0 auto;
    width: 60%;
  }
  h1 {
    text-align: center;
    padding: 30px 0 20px 0;
  }
  .aboutUs {
    opacity: 0.6;
    line-height: 30px;
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
</style>
<style rel="stylesheet/scss" lang="scss">
.aboutUs {
  .el-carousel__indicator {
    padding: 0 10px;
    .el-carousel__button {
      width: 13px;
      height: 13px;
      border-radius: 50%;
    }
  }
}
</style>