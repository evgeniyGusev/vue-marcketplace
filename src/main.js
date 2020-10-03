import Vue from 'vue';
import router from './router/index';
import store from './store/store';
import axios from 'axios';

import { Plugin } from "vue-fragment";
import numberFormat from './plugins/numberFormat/numberFormat';
import textConvertToShort from './plugins/textFormat/textConvertToShort';

import App from './App.vue';

axios.defaults.baseURL = 'http://vue-study.dev.creonit.ru/api/';

Vue.use(numberFormat);
Vue.use(textConvertToShort);
Vue.use(Plugin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
