import Cookies from 'js-cookie';
import {
  err
} from '@/utils';
import {
  getCateList
} from '@/api/menu';
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    map: {},
    share: false,
    classificationId: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_MAP: (state, map) => {
      state.map = map;
    },
    TOGGLE_SHARE: (state) => {
      state.share = !state.share;
    }
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR');
    },
    ToggleShare: ({
      commit
    }) => {
      commit('TOGGLE_SHARE');
    },
    CloseSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    // 获取映射关系
    SetMap({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getCateList().then(response => {
          if (response.code === 1) {
            const data = response.data;
            commit('SET_MAP', data);
            const classificationId = Object.keys(data.classification_id)[0];
            resolve(classificationId);
          } else {
            err(response.message);
            reject();
          }
        });
      });
    }
  }
};

export default app;
