import Axios from 'axios'
import Vue from 'vue'
import Storage from "../utils/localStorage"
const storage = new Storage('NAV')
// axios改造
var axios = Axios.create({
  timeout: 3000,
  headers: {'token': storage.get('TOKEN')}
});

// 请求前
axios.interceptors.request.use(res => {
  return res
}, (error) => {
  return Promise.reject(error)
})

// 请求后
axios.interceptors.response.use(response => {
  
  return response
}, error => {
  
  // 省略其它代码 ······
  return Promise.reject(error)
})

function request (url = '', methods='get', params = {}) {
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
