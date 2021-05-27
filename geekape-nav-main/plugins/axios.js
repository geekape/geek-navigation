import axios from 'axios'
import Storage from './localStorage'
import appConfig from '../nuxt.config'

const storage = new Storage()

const toLogin = (test) => {
  location.replace('/login')
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

const myAxios = axios.create({
  baseURL: process.env.root,
})

myAxios.interceptors.request.use(function (config) {
  if(process.browser){
    const token = storage.get('TOKEN')
    token && (config.headers.Authorization = token)
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  if(process.browser){
    errorHandle(error.response.status)
  }
  return Promise.reject(error.response.data.message);
});

export default myAxios
