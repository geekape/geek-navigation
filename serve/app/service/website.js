const Service = require('egg').Service

class WebsiteService extends Service {
  async find() {
    const { ctx } = this
    return ctx.model.Website.find()
  }

  async add(payload) {
    const { ctx } = this
    return ctx.model.Website.create(payload)
  }

  async delete(id) {
    const { ctx } = this
    return ctx.model.Website.remove({_id: id})
  }

  async edit(payload) {
    const { ctx } = this
    const id = payload.id
    delete payload.id
    return ctx.model.Website.findByIdAndUpdate(id, payload)
  }
}


module.exports = WebsiteService