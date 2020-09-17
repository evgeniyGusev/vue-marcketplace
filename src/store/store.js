import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartProducts: [],
  },

  mutations: {
    ADD_PRODUCT_TO_CART(state, product) {
      const item = state.cartProducts.find(el => el.productId === product.productId);

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartProducts.push(product);
      }
    },

    UPDATE_PRODUCT_AMOUNT(state, { productId, amount }) {
      const item = state.cartProducts.find(el => el.productId === productId);

      item ? item.amount = amount : false;
    },

    DELETE_CART_PRODUCT(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    }
  },

  getters: {
    productsInCartLength: state => state.cartProducts.length,

    detailCartProducts: state => {
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(p => p.id === item.productId)
        }
      });
    },

    cartTotalPrice: (state, getters) => {
      return getters.detailCartProducts.reduce(
        (a, b) => a + b.product.price * b.amount,
        0
      );
    },
  },

});

export default store;