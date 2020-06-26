
import { request } from './config'


const api = {
  getHome() {
    return request('/api/index')
  },
  addAudit(data) {
    return request('/api/audit/add', 'post', data)
  },
  getAuditList(status = 0) {
    return request(`/api/audit/list?status=${status}`)
  },
  delAuditNav(data) {
    return request('/api/audit/del', 'post', data)
  },
  fastRejectAudit() {
    return request('/api/audit/fastReject', 'post')
  },
  addNav(data) {
    return request('/api/nav/add', 'post', data)
  },
  editNav(data) {
    return request('/api/nav/edit', 'post', data)
  },
  delNav(id) {
    return request('/api/nav/del', 'post', {
      id,
    })
  },
  findNav(id) {
    return request('/api/nav/find', 'post', {
      id
    })
  },
  login(data) {
    return request('/api/login', 'post', data)
  },

  getCategoryList() {
    return request('/api/category/list')
  },
  addCategory(data) {
    return request('/api/category/add', 'post',  data)
  },
  delCategory(id) {
    return request('/api/category/del', 'post', { id })
  },
  editCategory(data) {
    return request('/api/category/edit', 'post', data)
  },
}

export default api