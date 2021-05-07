import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from './router/index.js';
import './config/rem.js';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
