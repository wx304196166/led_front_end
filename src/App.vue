<template>
  <div id="app">
    <!-- login -->
    <el-dialog :visible.sync="loginDialog" width="500px">
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item label="Login name:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="password:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" @keyup.enter.native="handleLogin" auto-complete="off"></el-input>
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
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item label="Login name:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Name:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email:" :label-width="formLabelWidth">
          <el-input v-model="loginForm.email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="regist">regist</el-button>
        <el-button @click="registerDialog = false">cancel</el-button>
      </div>
    </el-dialog>
    <ul class="menu page-container clearfix">
      <li class="logo bg" :style="{backgroundImage:`url(${logo})`}">
        <router-link to="/dashboard">
        </router-link>
      </li>
      <li v-for="(link,index) in routes" :key="link.path" class="link">
        <span>
          <span v-if="index===routes.length-1" class="login-box gradient-font pointer" @click.stop="loginDialog=true">
            Log In / Sign Up
          </span>
          <router-link :to="link.path">
            {{ link.name }}
          </router-link>
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
export default {
  name: 'App',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      Foot1, Foot2, Foot3, Foot4, Foot5,
      logo,
      // 登录部分
      loginDialog: false,
      registerDialog: false,
      formLabelWidth: '100px',
      loading: false,
      loginForm: {
        username: '',
        password: '',
        realName: '',
        phone: '',
        email: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => !item.hidden);
    }
  },
  methods: {
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
          return false
        }
      })
    },
    regist() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          registerCustom(this.loginForm).then(res => {
            if (res.code === 0) {
              this.$message.success('Regist Success');
            } else {
              this.$message.error(res.message);
            }
            this.registerDialog = false;
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.content {
  min-height: calc(100% - 150px);
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
  z-index: 1500;
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
