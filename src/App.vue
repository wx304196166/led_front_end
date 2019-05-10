<template>
  <div id="app">
    <!-- share -->
    <div v-show="shareDialog" class="share-box" @click.self="toggleShare">
      <div>
        <ul class="share">
          <li class="-mob-share-linkedin">
            <img :src="Linkedin" alt>
            <span>Linkedin</span>
          </li>
          <li class="-mob-share-instapaper">
            <img :src="Instapaper" alt>
            <span>Instapaper</span>
          </li>
          <li class="-mob-share-tumblr">
            <img :src="Tumblr" alt>
            <span>Tumblr</span>
          </li>
          <li class="-mob-share-facebook">
            <img :src="Facebook" alt>
            <span>Facebook</span>
          </li>
          <li class="-mob-share-twitter">
            <img :src="Twitter" alt>
            <span>Twitter</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- login -->
    <el-dialog :visible.sync="loginDialog" width="350px">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item label="Login name" prop="username" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" type="password" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
      </el-form>
      <span class="register" @click.stop="registerDialog=true;loginDialog = false">register</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="handleLogin" :loading="loading">login</el-button>
        <el-button @click="loginDialog = false">cancel</el-button>
      </div>
    </el-dialog>
    <!-- regist -->
    <el-dialog :visible.sync="registerDialog" width="450px">
      <el-form ref="loginForm" :model="loginForm" :rules="registRules">
        <el-form-item label="Login name" prop="username" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="confirm_password" :label-width="formLabelWidth">
          <el-input v-model="loginForm.confirm_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="True Name" prop="truename" :label-width="formLabelWidth">
          <el-input v-model="loginForm.truename"></el-input>
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Code" :label-width="formLabelWidth">
          <input type="text" class="idetify" v-model="userInputCode">
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regist">regist</el-button>
        <el-button @click="registerDialog = false">cancel</el-button>
      </div>
    </el-dialog>
    <ul class="menu page-container clearfix">
      <li class="logo bg" :style="{backgroundImage:`url(${logo})`}">
        <router-link to="/dashboard"/>
      </li>
      <li
        :title="nickname?'Click to Log out':''"
        @click="logoutFun"
        class="login-box gradient-font pointer"
      >
        <span v-if="nickname">Welcome, {{nickname}}!</span>
        <span v-else @click.stop="loginDialog=true">Log In / Sign Up</span>
      </li>
      <li v-for="link in routes" :key="link.path" class="link">
        <span>
          <span v-if="link.name==='Products'" class="pointer submenu-father">
            {{ link.meta.title }}
            <ul class="subMenu">
              <li
                @click.stop="jump(link.path,key)"
                v-for="(val,key) in map.classification_id"
                :key="key"
              >{{val}}</li>
            </ul>
          </span>
          <span v-else @click.stop="jump(link.path)" class="pointer">{{ link.meta.title }}</span>
        </span>
      </li>
    </ul>

    <div class="content">
      <router-view/>
    </div>
    <div class="foot page-container">
      <div>
        <h1>Visual Artisan</h1>
        <ul class="linkOther">
          <li class="-mob-share-facebook">
            <img :src="Foot1">
          </li>
          <li class="-mob-share-linkedin">
            <img :src="Foot3">
          </li>
          <li class="-mob-share-twitter">
            <img :src="Foot4">
          </li>
          <li class="-mob-share-youtube">
            <a href="https://www.youtube.com" target="_blank">
              <img :src="Foot5">
            </a>
          </li>
        </ul>
      </div>
      <div class="line">
        <!-- <ul class="footLink">
          <li v-for="link in friends" :key="link.url" class="link">
            <a :href="link.url" target="_blank">{{ link.name }}</a>
          </li>
        </ul>-->
        <ul class="footLink">
          <li v-for="link in routes" :key="link.path" class="link">
            <router-link :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
        <span>Copyright © 2019 Visual Artisan. All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
import { registerCustom } from "@/api/login";
import Foot1 from "@/assets/img/home/foot1.png";
import Foot2 from "@/assets/img/home/foot2.png";
import Foot3 from "@/assets/img/home/foot3.png";
import Foot4 from "@/assets/img/home/foot4.png";
import Foot5 from "@/assets/img/home/foot5.png";
import logo from "@/assets/img/logo.png";
import Facebook from "@/assets/img/share/Facebook.png";
import Instapaper from "@/assets/img/share/Instapaper.png";
import Linkedin from "@/assets/img/share/Linkedin.png";
import Tumblr from "@/assets/img/share/Tumblr.png";
import Twitter from "@/assets/img/share/Twitter.png";
import sIdentify from "./components/Validate/identify";
export default {
  name: "App",
  components: { sIdentify },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Username can not be empty"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("Password can not be less than 5"));
      } else {
        callback();
      }
    };
    const validateConfirm = (rule, value, callback) => {
      if (value != this.loginForm.password) {
        callback(new Error("Password and confirm must be consistent"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("Mobile number format error"));
      } else {
        callback();
      }
    };
    return {
      Foot1,
      Foot2,
      Foot3,
      Foot4,
      Foot5,
      logo,
      // 分享图片
      Facebook,
      Instapaper,
      Linkedin,
      Tumblr,
      Twitter,
      // 登录部分
      identifyCodes: "1234567890",
      identifyCode: "",
      loginDialog: false,
      userInputCode: "",
      registerDialog: false,
      submenu: false,
      formLabelWidth: "100px",
      loading: false,
      loginForm: {
        username: "",
        password: "",
        truename: "",
        confirm_password: "",
        mobile: "",
        email: ""
      },
      friends: [
        { name: "PRG", url: "https://www.prg.com/" },
        { name: "BARCO", url: "https://www.barco.com.cn/zh-CN/" },
        { name: "ASTEL LED", url: "https://www.astelled.com.tr/" },
        { name: "ANALOG WAY", url: "https://www.analogway.com/emea/" },
        { name: "MIKYAJY", url: "http://www.kojamjoom.com/" }
      ],
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      registRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        confirm_password: [
          { required: true, trigger: "blur", validator: validateConfirm }
        ],
        truename: [{ required: true, trigger: "blur" }],
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      }
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => !item.hidden);
    },
    nickname() {
      return this.$store.getters.nickname;
    },
    map() {
      return this.$store.getters.map;
    },
    shareDialog() {
      return this.$store.getters.share;
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },

  methods: {
    toggleShare() {
      this.$store.dispatch("ToggleShare");
    },
    logoutFun() {
      if (this.nickname) {
        this.$store.dispatch("LogOut").then(() => {
          this.$message.success("Log out succeeded");
        });
      }
    },
    jump(path, id) {
      switch (path) {
        case "/products/:id":
          this.$router.push({ path: "/products/" + id });
          // this.$router.go(0);
          return;
        case "/integrationSummary":
          if (this.nickname) {
            break;
          } else {
            this.$router.push({ path: "/integration", query: { id: "box" } });
            return;
          }
      }
      this.$router.push({ path });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.loginDialog = false;
            })
            .catch(() => {
              this.loading = false;
              this.loginDialog = false;
            });
        } else {
          // console.log('error submit!!')
          return false;
        }
      });
    },
    regist() {
      // 校验验证码
      if (this.identifyCode === this.userInputCode) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            registerCustom(this.loginForm).then(res => {
              if (res.code === 1) {
                this.$message.success("Regist Success");
              } else {
                this.$message.error(res.msg);
              }
              this.registerDialog = false;
            });
          } else {
            // console.log('error submit!!')
            return false;
          }
        });
      } else {
        this.$message.error("please check code");
      }
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.share-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2019;
  background: rgba(0, 0, 0, 0.45);
  > div {
    width: 800px;
    margin: 16vh auto 0;
    background: #fff;
    position: relative;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    padding: 50px;
  }
  .share {
    display: flex;
    > li {
      margin-right: 25px;
      flex: 1;
      cursor: pointer;
      img {
        width: 100%;
      }
      span {
        width: 100%;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
      }
    }
    > li:last-child {
      margin-right: 0;
    }
  }
}
.subMenu {
  background-color: rgba(0, 0, 0, 0.78);
  line-height: 50px;
  width: 100%;
  min-width: 120px;
  margin: 0 auto;
  visibility: hidden;
  opacity: 0;
  height: 0;
  transition: all 0.35s;
  overflow: hidden;
  > li {
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    font-weight:initial;
  }
}
.submenu-father {
  display: inline-block;
  &:hover {
    .subMenu {
      visibility: visible;
      opacity: 1;
      height: auto;
    }
  }
}
.content {
  min-height: calc(100% - 150px);
}
.idetify {
  vertical-align: top;
  border: 1px solid #dcdfe6;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
}
.code {
  display: inline-block;
  width: 114px;
  height: 40px;
}
.foot {
  background-color: #010101;
  color: #fff;
  min-height: 150px;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  h1 {
    display: inline-block;
  }
  .line {
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    padding-top: 20px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 20px;
    > span {
      float: right;
    }
  }
  .linkOther {
    float: right;
    font-size: 0;
    margin-top: 6px;
    li img {
      width: 20px;
      cursor: pointer;
    }
  }
  .linkOther li,
  .footLink li {
    float: left;
    margin-right: 20px;
  }
}
.gradient-font {
  color: transparent;
  background: linear-gradient(to top, #ca0090, #ff0096);
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -ms-background-clip: text;
  -o-background-clip: text;
}
.el-dialog__footer,
.dialog-footer {
  text-align: center;
  button:first-child {
    margin-right: 50px;
  }
}
.menu {
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  height: 5rem;
  line-height: 5rem;
  background: rgba($color: #000000, $alpha: 0.78);
  font-size: 1.1429rem;
  color: #fafafa;
  padding: 0 10%;
  font-weight: bold;
}
.logo {
  position: absolute;
  top: 7px;
  left: 0;
  width: 140px;
  cursor: pointer;
  margin-left: 30px;
  a {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}
.link {
  flex: 1;
  text-align: center;
  > span {
    position: relative;
  }
}
.login-box {
  position: absolute;
  white-space: nowrap;
  right: 1.5%;
  top: 0;
  font-size: 12px;
  line-height: 70px;
  // z-index: 3100;
}
.register {
  float: right;
  cursor: pointer;
}
</style>
