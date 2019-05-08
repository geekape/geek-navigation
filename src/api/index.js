
import { request } from './config'


const api = {
  getHome() {
    return request('/api/index')
  },
  addNav(data) {
    return request('/api/audit/add', 'post', data)
  },
  getAuditList() {
    return request('/api/audit/list')
  }
}

export default api