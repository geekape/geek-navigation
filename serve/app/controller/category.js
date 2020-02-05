'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 分类列表
  async list() {
    const { ctx, service } = this
    const res = await service.category.find()
    await ctx.helper.success({ ctx, res })
  }
  // 添加分类
  async add() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.category.add(payload)
    await ctx.helper.success({ ctx, res })
  }
  // 删除分类
  async delete() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.category.delete(payload.id)
    await ctx.helper.success({ ctx, res })
  }
  // 编辑分类
  async edit() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.category.edit(payload.id)
    await ctx.helper.success({ ctx, res })
  }
}

module.exports = CategoryController
