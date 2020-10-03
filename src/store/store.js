import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: null,

    isCartPopupVisible: false
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

    cartPopupVisibleStatus: (state) => state.isCartPopupVisible
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
    },
    CHANGE_CARTPOPUP_VISIBLE(state) {
      state.isCartPopupVisible = !state.isCartPopupVisible
    }
  },

  actions: {
    loadCart({ state, commit }) {
      return axios.get('baskets', {
        params: {
          userAccessKey: state.userAccessKey
        }
      })
        .then((response) => {
          if (!state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            commit('UPDATE_USER_ACCESSKEY', response.data.user.accessKey);
          }

          commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
          commit('SYNC_CARTPRODUCTS');
        })
    },

    addProduct({ state, commit }, { productId, amount, colorId }) {
      return axios
        .post('baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: state.userAccessKey
          }
        })
        .then(response => {
          commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
          commit('SYNC_CARTPRODUCTS', colorId);
          commit('CHANGE_CARTPOPUP_VISIBLE');
          setTimeout(() => {
            if (state.isCartPopupVisible) {
              commit('CHANGE_CARTPOPUP_VISIBLE');
            }
          }, 5000)

        })
    },

    updateCartProductAmount({ state, commit }, { productId, amount }) {
      commit('UPDATE_PRODUCT_AMOUNT', { productId, amount })

      if (amount < 1) {
        return
      }

      return axios
        .put('baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: state.userAccessKey
          }
        })
        .then(response => {
          commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
        })
        .catch(() => commit('SYNC_CARTPRODUCTS'))
    },

    deleteProductFromCart({ state, commit }, productId) {
      commit('DELETE_CART_PRODUCT', productId)

      return axios
        .request({
          url: 'baskets/products',
          method: 'DELETE',
          params: {
            userAccessKey: state.userAccessKey,
          },
          data: {
            productId
          }
        })
        .then(response => {
          commit('UPDATE_CARTPRODUCTS_DATA', response.data.items);
        })
        .catch(() => commit('SYNC_CARTPRODUCTS'))
    }
  }
});

export default store;