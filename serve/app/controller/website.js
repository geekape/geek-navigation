'use strict';

const Controller = require('egg').Controller;

class WebsiteController extends Controller {
  // 网站列表
  async list() {
    const { ctx, service } = this
    const res = await service.website.find()
    await ctx.helper.success({ ctx, res })
  }
  // 添加网站
  async add() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.website.add(payload)
    await ctx.helper.success({ ctx, res })
  }
  // 删除网站
  async delete() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.website.delete(payload.id)
    await ctx.helper.success({ ctx, res })
  }
  // 编辑网站
  async edit() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.website.edit(payload)
    await ctx.helper.success({ ctx, res })
  }
}

module.exports = WebsiteController
