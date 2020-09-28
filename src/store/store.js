import Vue from 'vue';
import Vuex from 'vuex';
import { BASE_API_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: null
  },

  getters: {
    productsInCartLength: state => state.cartProducts.length,

    detailCartProducts: state => {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },

    cartTotalPrice: (state, getters) => {
      return getters.detailCartProducts.reduce(
        (a, b) => a + b.product.price * b.amount,
        0
      );
    },
  },

  mutations: {
    UPDATE_PRODUCT_AMOUNT(state, { productId, amount }) {
      const item = state.cartProducts.find(el => el.productId === productId);

      if (item) {
        item.amount = amount;
      } else {
        return false;
      }
    },

    DELETE_CART_PRODUCT(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },

    UPDATE_USER_ACCESSKEY(state, accessKey) {
      state.userAccessKey = accessKey;
    },

    UPDATE_CARTPRODUCTS_DATA(state, productsData) {
      state.cartProductsData = productsData
    },

    SYNC_CARTPRODUCTS(state, colorId) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
          colorId
        }
      })
    }
  },

  actions: {
    loadCart(context) {
      return axios.get(BASE_API_URL + 'baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('UPDATE_USER_ACCESSKEY', response.data.user.accessKey);
          }

          context.commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
          context.commit('SYNC_CARTPRODUCTS');
        })
    },

    addProduct(context, { productId, amount, colorId }) {
      return axios
        .post(BASE_API_URL + 'baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
          context.commit('SYNC_CARTPRODUCTS', colorId);
        })
    },

    updateCartProductAmount(context, { productId, amount }) {
      context.commit('UPDATE_PRODUCT_AMOUNT', { productId, amount })

      if (amount < 1) {
        return
      }

      return axios
        .put(BASE_API_URL + 'baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
        })
        .catch(() => context.commit('SYNC_CARTPRODUCTS'))
    },

    deleteProductFromCart(context, productId) {
      context.commit('DELETE_CART_PRODUCT', productId)

      return axios
        .request({
          url: BASE_API_URL + 'baskets/products',
          method: 'DELETE',
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId
          }
        })
        .then(response => {
          context.commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
        })
        .catch(() => context.commit('SYNC_CARTPRODUCTS'))
    }
  }
});

export default store;