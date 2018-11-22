import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Mock from "./mock"
import axios from 'axios'

Vue.config.productionTip = false

import './assets/styles/iconfont.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$http= axios
Vue.config.productionTip = false

new Vue({
	router,
  	render: h => h(App)
}).$mount('#app')
