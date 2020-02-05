'use strict';

const Controller = require('egg').Controller;

class AuditController extends Controller {
  // 审核的网站列表
  async list() {
    const { ctx, service } = this
    const res = await service.audit.find()
    await ctx.helper.success({ ctx, res })
  }
  // 添加审核
  async add() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.audit.add(payload)
    await ctx.helper.success({ ctx, res })
  }
  // 删除审核
  async delete() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.audit.delete(payload.id)
    await ctx.helper.success({ ctx, res })
  }
  // 编辑审核
  async edit() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.audit.edit(payload)
    await ctx.helper.success({ ctx, res })
  }

  // 提交审核
  // 启动爬虫爬url网站的名字，logo，描述信息
  // 编辑审核
  // payload: status, id, url
  async submit() {
    const { ctx, service } = this
    const payload = ctx.request.body || {}
    const res = await service.audit.submit(payload)
    await ctx.helper.success({ ctx, res })
  }
}

module.exports = AuditController
