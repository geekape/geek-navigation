
import axios from '@/plugins/axios';

function objToQuery(obj) {
  if (!obj) return ''

  let query = `?`
  for (let i in obj) {
    query += `${i}=${obj[i]}&`
  }
  return query
}

const api = {
  getHome(data) {
    return axios.get(`/api/index${objToQuery(data)}`)
  },
  addAudit(data) {
    return axios.post('/api/audit/add', data)
  },
  getAuditList(status = 0) {
    return axios.get(`/api/audit/list?status=${status}`)
  },
  delAuditNav(data) {
    return axios.post('/api/audit/del', data)
  },
  fastRejectAudit() {
    return axios.post('/api/audit/fastReject')
  },
  addNav(data) {
    return axios.post('/api/nav/add', data)
  },
  editNav(data) {
    return axios.post('/api/nav/edit', data)
  },
  delNav(id) {
    return axios.post('/api/nav/del', {
      id,
    })
  },
  findNav(id) {
    return axios.post('/api/nav/find', {
      id
    })
  },
  login(data) {
    return axios.post('/api/login', data)
  },

  getCategoryList() {
    return axios.get('/api/category/list')
  },
  addCategory(data) {
    return axios.post('/api/category/add', data)
  },
  delCategory(id) {
    return axios.post('/api/category/del', { id })
  },
  editCategory(data) {
    return axios.post('/api/category/edit', data)
  },
}

export default api
