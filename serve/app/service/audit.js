const Service = require('egg').Service

class AuditService extends Service {
  async find() {
    const { ctx } = this
    return ctx.model.Audit.find()
  }

  async add(payload) {
    const { ctx } = this
    return ctx.model.Audit.create(payload)
  }

  async delete(id) {
    const { ctx } = this
    return ctx.model.Audit.remove({_id: id})
  }

  async edit(payload) {
    const { ctx } = this
    const id = payload.id
    delete payload.id
    return ctx.model.Audit.findByIdAndUpdate(id, payload)
  }

  async submit(payload) {
    await this.edit(payload)
    const { url } = payload

    // 启动爬虫
    
  }
}


module.exports = AuditService