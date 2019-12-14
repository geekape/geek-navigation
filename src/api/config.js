import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'

import Storage from "../utils/localStorage"
const storage = new Storage('NAV')
// axios改造



// 请求前
axios.interceptors.request.use(res => {
  return res
}, (error) => {
  return Promise.reject(error)
})

// 请求后
axios.interceptors.response.use(response => {
  if (response.token) {
    storage.set('TOKEN', response.token);
  }
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
  let token = storage.get('TOKEN') || '';

  return axios({
    method: methods,
    url: url,
    data: params,
    headers: {
      "Authorization": token
    }
  })
}

export {
  axios,
  request
}
