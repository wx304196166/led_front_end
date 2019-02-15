import Vue from 'vue';
import Router from 'vue-router';
import err404 from '@/views/404';
import productDetail from '@/views/productDetail/productDetail';
import dashboard from '@/views/dashboard/dashboard';
import products from '@/views/products/products';
import integrationSummary from '@/views/integration/integrationSummary';
import integration from '@/views/integration/integration';
import maintenance from '@/views/maintenance/maintenance';

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
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: dashboard
  },
  {
    path: '/products',
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
    path: '/integrationSummary',
    name: 'integrationSummary',
    meta: {
      title: 'Integration'
    },
    component: integrationSummary
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    meta: {
      title: 'Maintenance'
    },
    component: maintenance
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
