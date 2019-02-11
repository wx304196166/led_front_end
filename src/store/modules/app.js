import Cookies from 'js-cookie';
import {
  err
} from '@/utils';
import {
  queryAllByList
} from '@/api/common';
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    map: {},
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
    SET_CLASSIFICATION: (state, id) => {
      state.classificationId = id;
    },
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR');
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
        queryAllByList(['brand', 'classification', 'label', 'product']).then(response => {
          if (response.code === 0) {
            const data = response.data;
            commit('SET_MAP', data);
            const classificationId = Object.keys(data.classification_id)[0];
            resolve(classificationId);
          } else {
            err(response.message);
            reject();
          }
        })
      })
    },
    SetClassification({
      commit
    }, id) {
      commit('SET_CLASSIFICATION', id);
    }
  }
};

export default app;
