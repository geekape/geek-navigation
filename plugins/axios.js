import axios from 'axios'
import Storage from './localStorage'

const storage = new Storage()

const toLogin = () => {
  location.href = '/login'
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
  baseURL: process.env.baseUrl,
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
  errorHandle(error.response.status)
  return Promise.reject(error);
});

export default myAxios
