import Axios from 'axios'
import Vue from 'vue'
import router from '../router/index'

import Storage from "../utils/localStorage"
const storage = new Storage('NAV')
// axios改造
var axios = Axios.create({
  timeout: 3000,
});




// 请求前
axios.interceptors.request.use(res => {
  const token = storage.get('TOKEN') || '';
  axios.defaults.headers.common['token'] = token

  return res
}, (error) => {
  return Promise.reject(error)
})

// 请求后
axios.interceptors.response.use(response => {
  if (response.token) {
    storage.set('TOKEN', response.token);
  }
  debugger
  if (response.status == 401) {
    router.push('/login');
  }

  return response
}, error => {
  router.push('/login');

  // 省略其它代码 ······
  return Promise.reject(error)
})

function request(url = '', methods = 'get', params = {}) {
  if (methods === 'get') {
    return axios.get(url)
  }
  if (methods === 'post') {
    return axios.post(url, params)
  }
}

export {
  axios,
  request
}
