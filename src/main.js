import Vue from 'vue';
import App from '@/App.vue';
import router from '@/app/router';
import store from '@/app/store';
import api from './app/api';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/main.css';

Vue.config.productionTip = false

// 设置统一的 API 请求
Vue.prototype.$api = api;

// 使用AntD
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
