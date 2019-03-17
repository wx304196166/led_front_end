<template>
  <div id="app">
    <!-- login -->
    <el-dialog :visible.sync="loginDialog" width="500px">
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
        <router-link to="/dashboard" />
      </li>
      <li v-for="(link,index) in routes" :key="link.path" class="link">
        <span>
          <span v-if="index===routes.length-1" class="login-box gradient-font pointer">
            <span v-if="nickname">Welcome, {{nickname}}!</span>
            <span v-else @click.stop="loginDialog=true">Log In / Sign Up</span>
          </span>
          <span v-if="link.name==='Products'" class="pointer submenu-father">
            {{ link.meta.title }}
            <ul class="subMenu">
              <li @click.stop="jump(link.path,key)" v-for="(val,key) in map.classification_id" :key="key">{{val}}</li>
            </ul>
          </span>
          <span v-else @click.stop="jump(link.path)" class="pointer">
            {{ link.meta.title }}
          </span>
        </span>
      </li>
    </ul>

    <div class="content">
      <router-view />
    </div>
    <div class="foot page-container">
      <div>
        <h1>VisualArtisan</h1>
        <ul class="linkOther">
          <li><img :src="Foot1" /></li>
          <li><img :src="Foot2" /></li>
          <li><img :src="Foot3" /></li>
          <li><img :src="Foot4" /></li>
          <li><img :src="Foot5" /></li>
        </ul>
      </div>
      <div class="line">
        <ul class="footLink">
          <li v-for="link in routes" :key="link.path" class="link">
            <router-link :to="link.path">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
        <span>Copyright © 2019 Artisan Visual. All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
import { registerCustom } from '@/api/login';
import Foot1 from '@/assets/img/home/foot1.png';
import Foot2 from '@/assets/img/home/foot2.png';
import Foot3 from '@/assets/img/home/foot3.png';
import Foot4 from '@/assets/img/home/foot4.png';
import Foot5 from '@/assets/img/home/foot5.png';
import logo from '@/assets/img/logo.png';
import sIdentify from './components/Validate/identify';
export default {
  name: 'App',
  components: { sIdentify },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Username can not be empty'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Password can not be less than 5'))
      } else {
        callback()
      }
    }
    const validateConfirm = (rule, value, callback) => {
      if (value != this.loginForm.password) {
        callback(new Error('Password and confirm must be consistent'))
      } else {
        callback()
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error('Mobile number format error'))
      } else {
        callback()
      }
    }
    return {
      Foot1, Foot2, Foot3, Foot4, Foot5,
      logo,
      // 登录部分
      identifyCodes: "1234567890",
      identifyCode: "",
      loginDialog: false,
      userInputCode: '',
      registerDialog: false,
      submenu: false,
      formLabelWidth: '100px',
      loading: false,
      loginForm: {
        username: '',
        password: '',
        truename: '',
        confirm_password: '',
        mobile: '',
        email: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        confirm_password: [{ required: true, trigger: 'blur', validator: validateConfirm }],
        truename: [{ required: true, trigger: 'blur' }],
        mobile: [{ required: true, trigger: 'blur',  validator: validateMobile }]
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
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },

  methods: {
    jump(path, id) {
      switch (path) {
        case '/products/:id':
          this.$router.push({ path: '/products/' + id });
          // this.$router.go(0);
          return;
        case '/integrationSummary':
          if (this.nickname) {
            break;
          } else {
            this.$alert('Please login first!', 'Tip', {
              confirmButtonText: 'ok',
              callback: action => {
                if (action === 'confirm') {
                  this.loginDialog = true;
                }
              }
            });
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
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.loginDialog = false;
          }).catch(() => {
            this.loading = false;
            this.loginDialog = false;
          })
        } else {
          // console.log('error submit!!')
          return false;
        }
      })
    },
    regist() {
      // 校验验证码
      if (this.identifyCode === this.userInputCode) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            registerCustom(this.loginForm).then(res => {
              if (res.code === 1) {
                this.$message.success('Regist Success');
              } else {
                this.$message.error(res.msg);
              }
              this.registerDialog = false;
            })
          } else {
            // console.log('error submit!!')
            return false;
          }
        })
      } else {
        this.$message.error("please check code");
      }
    },
  }

};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
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
}
.logo {
  width: 12.8571rem;
  cursor: pointer;
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
  right: 0;
  top: -20px;
  font-size: 1rem;
  line-height: 1.15rem;
}
.register {
  float: right;
  cursor: pointer;
}
</style>
