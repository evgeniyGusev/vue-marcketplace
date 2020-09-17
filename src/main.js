import Vue from 'vue';

import App from './App.vue';
import numberFormat from './plugins/numberFormat/numberFormat';
import router from './router/index';
import store from './store/store';

Vue.use(numberFormat);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
