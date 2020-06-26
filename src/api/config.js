import axios from 'axios'
import router from '../router/index'

import Storage from "../utils/localStorage"
const storage = new Storage('NAV')

const tip = (message) => {
  this.$message({
    showClose: true,
    message,
    type: 'error'
  })
}

const toLogin = () => {
  router.push('/login')
}

const errorHandle = (status) => {
  switch (status) {
    case 401:
      toLogin()
      break
    default:
      break
  }
}

var instance = axios.create({ timeout: 1000 * 12 })
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    const token = storage.get('TOKEN')
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error))

instance.interceptors.response.use(
  // 请求成功
  res => {
    errorHandle(res.status)
    
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      res.msg && tip(res.msg)
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    }
  })

export default instance
