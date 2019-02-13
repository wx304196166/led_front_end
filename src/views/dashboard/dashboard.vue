<template>
  <div style="height:100%" class="dashboard">
    <div id="myCarousel" style="position:relative;height:100%">
      <ul class="html5zoo-slides" style="display:none;">
        <li v-for="item in imgList" :key="item"><img :src="item" /></li>
      </ul>
    </div>
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
      aboutUsLIst: [
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. totam id corporis eveniet odio eos ad distinctio, mollitia dignissimos commodi alias sed excepturi tempore. Eveniet doloribus nemo suscipit porro, ipsam doloremque quae maiores impedit provident nobis, exercitationem eius voluptatibus assumenda quia velit.',
        'unde quod sapiente perferendis magnam, fugiat totam id corporis eveniet odio eos ad distinctio, mollitia dignissimos commodi alias sed excepturi tempore. Eveniet doloribus nemo suscipit porro, ipsam doloremque quae maiores impedit provident nobis, quia velit.'],
      screenHeight: window.innerHeight + 'px',
      About, Case1, Case2, Case3, About1, About2, About3, About4,
      mask,
      control: false
    };
  },
  mounted() {
    jQuery("#myCarousel").html5zoo({
      // jsfolder:'jsFolder',
      height: '100%',
      skinsfoldername: "",
      loadimageondemand: false,
      isresponsive: false,
      autoplayvideo: false,
      pauseonmouseover: false,
      addmargin: true,
      randomplay: false,
      slideinterval: 5000,
      enabletouchswipe: true,
      transitiononfirstslide: false,
      loop: 0,
      autoplay: true,
      // navplayvideoimage:"../../images/bg/play-32-32-0.png",
      navpreviewheight: 60,
      timerheight: 2,
      shownumbering: false,
      skin: "Frontpage",
      addgooglefonts: true,
      navshowplaypause: true,
      navshowplayvideo: false,
      navshowplaypausestandalonemarginx: 8,
      navshowplaypausestandalonemarginy: 8,
      navbuttonradius: 0,
      navthumbnavigationarrowimageheight: 32,
      navmarginy: 20,
      showshadow: false,
      navfeaturedarrowimagewidth: 16,
      navpreviewwidth: 120,
      googlefonts: "Inder",
      textpositionmarginright: 24,
      bordercolor: "#ffffff",
      navthumbnavigationarrowimagewidth: 32,
      navthumbtitlehovercss: "text-decoration:underline;",
      navcolor: "#999999",
      arrowwidth: 48,
      texteffecteasing: "easeOutCubic",
      texteffect: "fade",
      navspacing: 12,
      // playvideoimage:"../../images/bg/playvideo-64-64-0.png",
      // ribbonimage:"../../images/bg/ribbon_topleft-0.png",
      navwidth: 24,
      showribbon: false,
      // arrowimage: "../../images/bg/arrows-48-48-3.png",
      timeropacity: 0.6,
      // navthumbnavigationarrowimage:"../../images/bg/carouselarrows-32-32-0.png",
      navshowplaypausestandalone: false,
      navpreviewbordercolor: "#ffffff",
      ribbonposition: "topleft",
      navthumbdescriptioncss: "display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",
      arrowstyle: "mouseover",
      navthumbtitleheight: 20,
      textpositionmargintop: 24,
      navswitchonmouseover: false,
      // navarrowimage:"../../images/bg/navarrows-28-28-0.png",
      arrowtop: 50,
      textstyle: "static",
      playvideoimageheight: 64,
      navfonthighlightcolor: "#666666",
      showbackgroundimage: false,
      navpreviewborder: 4,
      navopacity: 0.48,
      shadowcolor: "#aaaaaa",
      navbuttonshowbgimage: false,
      // navbuttonbgimage:"../../images/bg/navbuttonbgimage-28-28-0.png",
      // textbgcss:"display:block; position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:#333333; opacity:0.6; filter:alpha(opacity=60);",
      navdirection: "horizontal",
      navborder: 4,
      // bottomshadowimagewidth:100,
      showtimer: true,
      navradius: 0,
      navshowpreview: false,
      navpreviewarrowheight: 8,
      navmarginx: 16,
      // navfeaturedarrowimage:"../../images/bg/featuredarrow-16-8-0.png",
      navfeaturedarrowimageheight: 8,
      // navstyle:"bullets",
      textpositionmarginleft: 24,
      descriptioncss: "display:block; position:relative; margin-top:4px; font:14px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#fff;",
      // navplaypauseimage:"../../images/bg/navplaypause-28-28-0.png",
      // backgroundimagetop:-10,
      timercolor: "#ffffff",
      numberingformat: "%NUM/%TOTAL ",
      navfontsize: 12,
      navhighlightcolor: "#333333",
      // navimage:"../../images/bg/bullet-24-24-4.png",
      navheight: 24,
      navshowplaypausestandaloneautohide: false,
      navbuttoncolor: "#999999",
      navshowarrow: false,
      navshowfeaturedarrow: false,
      titlecss: "display:block; position:relative; font:16px Inder,Arial,Tahoma,Helvetica,sans-serif; color:#fff;",
      ribbonimagey: 0,
      ribbonimagex: 0,
      navshowplaypausestandaloneposition: "bottomright",
      shadowsize: 5,
      arrowhideonmouseleave: 1000,
      navshowplaypausestandalonewidth: 28,
      navshowplaypausestandaloneheight: 28,
      backgroundimagewidth: 120,
      textautohide: true,
      navthumbtitlewidth: 120,
      navpreviewposition: "top",
      playvideoimagewidth: 64,
      arrowheight: 48,
      arrowmargin: 0,
      texteffectduration: 1000,
      // bottomshadowimage:"../../images/bg/bottomshadow-110-100-5.png",
      border: 0,
      timerposition: "bottom",
      navfontcolor: "#333333",
      navthumbnavigationstyle: "arrow",
      borderradius: 0,
      navbuttonhighlightcolor: "#333333",
      textpositionstatic: "bottom",
      navthumbstyle: "imageonly",
      textcss: "display:block; padding:12px; text-align:left;",
      navbordercolor: "#ffffff",
      // navpreviewarrowimage:"../../images/bg/previewarrow-16-8-0.png",
      showbottomshadow: false,
      textpositionmarginstatic: 0,
      backgroundimage: "",
      navposition: "none",
      navpreviewarrowwidth: 16,
      // bottomshadowimagetop:100,
      textpositiondynamic: "bottomleft",
      navshowbuttons: false,
      navthumbtitlecss: "display:block;position:relative;padding:2px 4px;text-align:left;font:bold 14px Arial,Helvetica,sans-serif;color:#333;",
      textpositionmarginbottom: 24,
      ribbonmarginy: 0,
      ribbonmarginx: 0,
      slide: {
        duration: 1000,
        easing: "easeOutCubic",
        checked: true
      },
      crossfade: {
        duration: 1000,
        easing: "easeOutCubic",
        checked: true
      },
      threedhorizontal: {
        checked: true,
        bgcolor: "#222222",
        perspective: 1000,
        slicecount: 1,
        duration: 1500,
        easing: "easeOutCubic",
        fallback: "slice",
        scatter: 5,
        perspectiveorigin: "bottom"
      },
      slice: {
        duration: 1500,
        easing: "easeOutCubic",
        checked: true,
        effects: "up,down,updown",
        slicecount: 10
      },
      fade: {
        duration: 1000,
        easing: "easeOutCubic",
        checked: true
      },
      blocks: {
        columncount: 5,
        checked: true,
        rowcount: 5,
        effects: "topleft,bottomright,top,bottom,random",
        duration: 1500,
        easing: "easeOutCubic"
      },
      blinds: {
        duration: 2000,
        easing: "easeOutCubic",
        checked: true,
        slicecount: 3
      },
      shuffle: {
        duration: 1500,
        easing: "easeOutCubic",
        columncount: 5,
        checked: true,
        rowcount: 5
      },
      threed: {
        checked: true,
        bgcolor: "#000",
        perspective: 1000,
        slicecount: 5,
        duration: 1500,
        easing: "easeOutCubic",
        fallback: "slice",
        scatter: 5,
        perspectiveorigin: "right"
      },
      transition: "slide,crossfade,threedhorizontal,slice,fade,blocks,blinds,shuffle,threed"
    });
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
  .html5zoo-nav-0,.html5zoo-nav-1,.html5zoo-nav-2,.html5zoo-nav-3{
    bottom: 7%;
    left: calc(50% - 36px);
  }
  .html5zoo-watermark-0,.html5zoo-watermark-1,.html5zoo-watermark-2,.html5zoo-watermark-3{
    display: none;
  }
}
</style>