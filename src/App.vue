<template>
  <div id="app">
    <!-- login -->
    <el-dialog :visible.sync="loginDialog" width="500px">
      <el-form :model="form">
        <el-form-item label="Login name:" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Passord:" :label-width="formLabelWidth">
          <el-input v-model="form.passord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="register" @click.stop="registerDialog=true">register</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">login</el-button>
        <el-button @click="dialogFormVisible = false">cancel</el-button>
      </div>
    </el-dialog>
    <!-- regist -->
    <el-dialog :visible.sync="registerDialog" width="450px">
      <el-form :model="form">
        <el-form-item label="Login name:" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Passord:" :label-width="formLabelWidth">
          <el-input v-model="form.passord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Name:" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone:" :label-width="formLabelWidth">
          <el-input v-model="form.passord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email:" :label-width="formLabelWidth">
          <el-input v-model="form.passord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">regist</el-button>
        <el-button @click="dialogFormVisible = false">cancel</el-button>
      </div>
    </el-dialog>
    <ul class="menu page-container clearfix">
      <li class="logo gradient-font">VisualArtisan</li>
      <li v-for="(link,index) in routes" :key="link.path" class="link">
        <router-link :to="link.path">
          <span v-if="index===routes.length-1" class="login-box gradient-font pointer" @click.stop="loginDialog=true">
            Log In / Sign Up
          </span>
          {{ link.name }}
        </router-link>
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

import Foot1 from '@/assets/img/home/foot1.png';
import Foot2 from '@/assets/img/home/foot2.png';
import Foot3 from '@/assets/img/home/foot3.png';
import Foot4 from '@/assets/img/home/foot4.png';
import Foot5 from '@/assets/img/home/foot5.png';
export default {
  name: 'App',
  data() {
    return {
      Foot1, Foot2, Foot3, Foot4, Foot5,
      loginDialog: false,
      registerDialog: false,
      formLabelWidth: '100px',
      form: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(item => !item.hidden);
    }
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
    display: inline-block;
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
  z-index: 1000;
  height: 5rem;
  line-height: 5rem;
  background: rgba($color: #000000, $alpha: 0.78);
  font-size: 1.1429rem;
  color: #fafafa;
}
.logo {
  font-size: 2rem;
  width: 12.8571rem;
  font-weight: 700;
}
.link {
  flex: 1;
  text-align: center;
  > a {
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
