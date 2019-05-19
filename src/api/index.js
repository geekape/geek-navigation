
import { request } from './config'


const api = {
  getHome() {
    return request('/api/index')
  },
  addAudit(data) {
    return request('/api/audit/add', 'post', data)
  },
  getAuditList() {
    return request('/api/audit/list')
  },
  delNav(data) {
    return request('/api/audit/del', 'post', data)
  },
  addNav(data) {
    return request('/api/nav/add', 'post', data)
  },
  login(account, pwd) {
    return request('/api/login', 'post', {
      account,
      pwd
    })
  }
}

export default api