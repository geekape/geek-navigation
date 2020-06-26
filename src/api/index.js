
import request from './config'


const api = {
  getHome() {
    return request.get('/api/index')
  },
  addAudit(data) {
    return request.post('/api/audit/add', data)
  },
  getAuditList(status = 0) {
    return request.get(`/api/audit/list?status=${status}`)
  },
  delAuditNav(data) {
    return request.post('/api/audit/del', data)
  },
  fastRejectAudit() {
    return request.post('/api/audit/fastReject')
  },
  addNav(data) {
    return request.post('/api/nav/add', data)
  },
  editNav(data) {
    return request.post('/api/nav/edit', data)
  },
  delNav(id) {
    return request.post('/api/nav/del', {
      id,
    })
  },
  findNav(id) {
    return request.post('/api/nav/find', {
      id
    })
  },
  login(data) {
    return request.post('/api/login', data)
  },

  getCategoryList() {
    return request.get('/api/category/list')
  },
  addCategory(data) {
    return request.post('/api/category/add', data)
  },
  delCategory(id) {
    return request.post('/api/category/del', { id })
  },
  editCategory(data) {
    return request.post('/api/category/edit', data)
  },
}

export default api