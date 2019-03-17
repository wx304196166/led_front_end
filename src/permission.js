import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
  Message
} from 'element-ui';
import {
  getToken
} from '@/utils/auth'; // 验权

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (Object.keys(store.getters.userInfo).length === 0) {
      store.dispatch('GetInfo').then(() => { // 拉取用户信息
        store.dispatch('SetMap').then(() => {
          next();
        });
      }).catch((err) => {
        store.dispatch('LogOut').then(() => {
          Message.error(err || 'Verification failed, please login again');
          next({
            path: '/'
          });
        });
      });
    } else {
      next();
    }
  } else if (Object.keys(store.getters.map).length === 0) {
    store.dispatch('SetMap').then(() => {
      next();
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
