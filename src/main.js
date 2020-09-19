import Vue from 'vue';

import App from './App.vue';
import numberFormat from './plugins/numberFormat/numberFormat';
import router from './router/index';
import store from './store/store';
import { Plugin } from "vue-fragment";

Vue.use(numberFormat);
Vue.use(Plugin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
