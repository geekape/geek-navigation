import { Controller } from 'egg';

export default class CommonController extends Controller {
  tableName() {
    return ''
  }
  success(data) {
    this.ctx.body = {
      code: 1,
      msg: 'ok',
      data,
    };
  }
  error(msg) {
    this.ctx.body = {
      code: 0,
      msg,
      data: null,
    };
  }

  //添加
  async add() {
    const { request } = this.ctx
    const tableName = this.tableName()
    try {
      const res = await this.ctx.model[tableName].create(request.body);
      this.success(res)
    } catch (e) {
      this.error(e.message)
    }
  }

  //删除
  async remove() {
    const { request } = this.ctx
    const tableName = this.tableName()
    try {
      const id = request.body.id
      const res = await this.ctx.model[tableName].remove({ _id: id })
      this.success(res)
    } catch (e) {
      this.error(e.message)
    }
  }

  //更新
  async update() {
    const { request } = this.ctx
    const tableName = this.tableName()
    try {
      const id = request.body.id
      delete request.body.id
      const res = await this.ctx.model[tableName].update({ _id: id }, request.body)
      this.success(res)
    } catch (e) {
      this.error(e.message)
    }
  }

  //查找一个
  async get() {
    const { request, query } = this.ctx
    const tableName = this.tableName()
    try {
      const id = query.id
      const res = await this.ctx.model[tableName].findOne({ _id: id })
      this.success(res)
    } catch (e) {
      this.error(e.message)
    }
  }

  //查找多个
  async getList(findObj = {}, otherCMD = (_table: any) => _table) {
    const { request, query } = this.ctx
    const tableName = this.tableName()

    try {
      let { pageSize = 10, pageNumber = 1 } = query
      pageSize = Number(pageSize)
      pageNumber = Number(pageNumber)
      const skipNumber = pageSize * pageNumber - pageSize
      const table = this.ctx.model[tableName]

      const [data, total] = await Promise.all([
        otherCMD(table.find(findObj).skip(skipNumber).limit(pageSize).sort({_id: -1})),
        table.find(findObj).count()
      ])

      this.success({
        data,
        total,
        pageNumber: Math.ceil(total / pageSize),
      })
    } catch (e) {
      this.error(e.message)
    }
  }

  //查找随机数量列表
  async getRandomList(randomNumber: number = 10) {
    const { request, query } = this.ctx
    const tableName = this.tableName()
    try {
      const res = await this.ctx.model[tableName].aggregate( [ { $sample: { size: randomNumber } } ] )
      this.success(res)
    } catch (e) {
      this.error(e.message)
    }
  }
}
