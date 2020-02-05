const Service = require('egg').Service

class CategoryService extends Service {
  async find() {
    const { ctx } = this
    return ctx.model.Category.find()
  }

  async add(payload) {
    const { ctx } = this
    return ctx.model.Category.create(payload)
  }

  async delete(id) {
    const { ctx } = this
    return ctx.model.Category.remove({_id: id})
  }

  async edit(payload) {
    const { ctx } = this
    const id = payload.id
    delete payload.id
    return ctx.model.Category.findByIdAndUpdate(id, payload)
  }
}


module.exports = CategoryService