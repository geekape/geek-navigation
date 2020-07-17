import Vue from 'vue'
import dayjs from 'dayjs'
import api from '../api'
import storage from './localStorage.js'

Vue.prototype.$api = api
Vue.prototype.$storage = new storage()
Vue.prototype.$dayjs = dayjs
