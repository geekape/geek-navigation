import Vue from 'vue'
import dayjs from 'dayjs'
import App from './App.vue'
import router from "./router"
import api from "./api"
import Mock from "./mock"
import localStorage from "./utils/localStorage"
const Storage = new localStorage('NAV')
Vue.config.productionTip = false
import './app.scss';

import './assets/styles/iconfont.css';
import './assets/styles/font.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$api= api
Vue.prototype.$dayjs= dayjs
Vue.prototype.$storage= Storage
Vue.config.productionTip = false

new Vue({
	router,
  	render: h => h(App)
}).$mount('#app')
