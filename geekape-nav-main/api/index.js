
import axios from '@/plugins/axios';

function objToQuery(obj) {
  if (!obj) return ''

  const query = `?`
  const queryArr = []
  for (let i in obj) {
    queryArr.push(`${i}=${obj[i]}`)
  }

  return query + queryArr.join('&')
}

const api = {

  addNav(data) {
    return axios.post('/api/nav', data)
  },
  editNav(data) {
    return axios.put('/api/nav', data)
  },
  findNav(id) {
    return axios.get(`/api/nav/find?categoryId=${id}`)
  },
  getCategoryList() {
    return axios.get('/api/category/list')
  },
}

export default api
