import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

export const constantRouterMap = [
  // 非菜单相关路由
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { key: '/register', component: () => import('@/views/register/index'), hidden: true },
  {
    path: '/productDetail',
    component: () => import('@/views/productDetail/productDetail'),
    hidden: true
  },
  // 菜单相关路由
  {
    path: '/dashboard',
    name: 'Home',
    meta: {
      title: 'dashboard'
    },
    component: () => import('@/views/dashboard/dashboard')
  },
  {
    path: '/products',
    name: 'Products',
    meta: {
      title: 'products'
    },
    component: () => import('@/views/products/products')
  },
  {
    path: '/integration',
    name: 'Integration',
    meta: {
      title: 'integration'
    },
    component: () => import('@/views/integration/integration')
  },
  {
    path: '/download',
    name: 'Download',
    meta: {
      title: 'download'
    },
    component: () => import('@/views/download/download')
  },

  {
    path: '/maintenance',
    name: 'Maintenance',
    meta: {
      title: 'maintenance'
    },
    component: () => import('@/views/maintenance/maintenance')
  },

  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
