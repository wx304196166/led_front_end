import {
  login,
  logout,
  getUserInfo
} from '@/api/login';
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth';
import {
  err
} from '@/utils';
const user = {
  state: {
    token: getToken(),
    userInfo: {},
    username: '',
    nickname: ''
    /* avatar: '',
    roles: [] */
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_REAL_NAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info;
    }
    /* SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    } */
    /* SET_ROLES: (state, roles) => {
      state.roles = roles
    } */
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.code === 1) {
            const data = response.data;
            setToken(data.logintoken);
            commit('SET_TOKEN', data.logintoken);
            commit('SET_USER_INFO', data.userinfo);
            commit('SET_USERNAME', data.userinfo.username);
            commit('SET_REAL_NAME', data.userinfo.nickname);
            resolve();
          } else {
            err(response.msg);
            reject();
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (response.code === 1) {
            const data = response.data;
            commit('SET_USER_INFO', data);
            commit('SET_USERNAME', data.username);
            commit('SET_REAL_NAME', data.truename);
            resolve(response);
          } else {
            err(response.message);
            reject();
          }
          reject();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_USER_INFO', {});
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USER_INFO', {});
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
