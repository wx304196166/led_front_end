import Vue from 'vue';
import Router from 'vue-router';
import err404 from '@/views/404';
import productDetail from '@/views/productDetail/productDetail';
import dashboard from '@/views/dashboard/dashboard';
import products from '@/views/products/products';
import integrationSummary from '@/views/integration/integrationSummary';
import integration from '@/views/integration/integration';
import maintenance from '@/views/maintenance/maintenance';
import aboutUs from '@/views/aboutUs/about';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

export const constantRouterMap = [
  // 非菜单相关路由
  {
    path: '/404',
    component: err404,
    hidden: true
  },

  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { key: '/register', component: () => import('@/views/register/index'), hidden: true },
  {
    path: '/productDetail/:id',
    component: productDetail,
    hidden: true
  },
  // 菜单相关路由
  {
    path: '/dashboard',
    name: 'Our Company',
    meta: {
      title: 'Our Company'
    },
    component: dashboard
  },
  {
    path: '/products/:id',
    name: 'Products',
    meta: {
      title: 'Products'
    },
    component: products
  },
  {
    path: '/integration',
    name: 'Integration',
    hidden: true,
    component: integration
  },
  {
    path: '/integration',
    name: 'Integration',
    meta: {
      title: 'Integration'
    },
    component: integrationSummary
  },
  {
    path: '/maintenance',
    name: 'Service',
    meta: {
      title: 'Service'
    },
    component: maintenance
  },
  {
    path: '/aboutus',
    name: 'About us',
    meta: {
      title: 'Contact'
    },
    component: aboutUs
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
