import Vue from 'vue';
import VueRouter from 'vue-router';
import products from '@/data/products';

import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CartPage from '@/pages/CartPage';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/'
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
    beforeEnter(to, from, next) {
      let product = products.find(el => el.id === to.params.id);

      if (!product) {
        next({ name: 'notFoundPage' })
      } else {
        next()
      }
    }
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart'
  },
  {
    name: 'notFoundPage',
    component: NotFoundPage,
    path: '*'
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;