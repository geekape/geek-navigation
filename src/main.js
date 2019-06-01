import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from "./router"
import Mock from "./mock"
import localStorage from "./utils/localStorage"
const Storage = new localStorage('NAV')
Vue.config.productionTip = false

import './assets/styles/iconfont.css';
import './assets/styles/font.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$storage= Storage
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
	router,
  	render: h => h(App)
}).$mount('#app')
