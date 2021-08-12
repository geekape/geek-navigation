import Controller from './common';
const request = require('request');
const cheerio = require('cheerio');

enum NAV_STATUS {
  wait,
  pass,
  refuse,
}

export default class NavController extends Controller {
  async list() {
    const { ctx } = this
    const { request, model } = ctx
    try {
      let { pageSize = 10, pageNumber = 1, status = 0, categoryId, name } = request.query
      pageSize = Number(pageSize)
      pageNumber = Number(pageNumber)
      const skipNumber = pageSize * pageNumber - pageSize

      let findParam: any = {
        status,
      }
      if (!status) {
        findParam = {
          $or: [
            { status: { $exists: false } },
            { status: 0 },
          ]
        }
      }
      if (categoryId) {
        findParam.categoryId = {
          $eq: categoryId
        }
      }
      if (name) {
        let reg = new RegExp(name,'i');
        findParam.name = {
          $regex: reg
        }
      }

      const [resData, total] = await Promise.all([
        model.Nav.aggregate([
          {
            $match: findParam
          },
          {
            $lookup: {
              from: 'category',
              localField: 'categoryId',
              foreignField: '_id',
              as: 'category'
            }
          }
        ]).skip(skipNumber).limit(pageSize).sort({_id: -1}),
        model.Nav.find(findParam).count(),
      ])
      this.success({
        data: resData,
        total,
        pageNumber: Math.ceil(total / pageSize),
      })
    } catch (error) {
      this.error(error.message)
    }
  }

  async add() {
    const { ctx } = this
    const { request: req, model } = ctx
    try {
      req.body.status = 1
      req.body.createTime = new Date()
      const res = model.Nav.create(req.body);
      this.success(res)
    } catch (error) {
      this.error(error.message)
    }
  }

  async reptile() {
    const { ctx } = this
    const { url } = ctx.query
    const that = this
    const res = await new Promise((resolve)=> {
      request(url, (error, requestData, body) => {
        if (!error && requestData.statusCode == 200) {
          const $ = cheerio.load(body)
          const name = $('title').text()
          const desc = $('meta[name="description"]').attr('content')

          resolve({
            name,
            desc,
            href: url,
          })
        } else {
          that.error('爬虫爬取失败')
        }
      })
    })

    this.success(res)
  }

  async del() {
    const { id } = this.ctx.request.body
    const res = await this.ctx.service.common.remove(id, 'Nav');
    this.success(res)
  }

  async edit() {
    const { body } = this.ctx.request

    if (body.status === NAV_STATUS.pass || body.status === NAV_STATUS.refuse) {
      body.auditTime = new Date()
    }
    const res = this.ctx.service.common.update(body, 'Nav')
    this.success(res);
  }

  /**
   * 取出一级分类下面的所有网站，并且处理返回
   */
  async info() {
    const { request, model } = this.ctx
    try {
      const { id, categoryId } = request.query
      let resData: any = []
      // 取所有子分类
      const categorys = await model.Category.find({ categoryId })
      const categoryIds = categorys.reduce((t, v) => [...t, v._id], [])

      const navs = await model.Nav.find({
        categoryId: { $in: categoryIds },
        $or: [
          { status: { $exists: false } },
          { status: 0 },
        ]
      })

      categorys.map(category => {
        const nowNavs = navs.filter(nav => nav.categoryId == category._id)
        resData.push({
          _id: category._id,
          name: category.name,
          list: nowNavs
        })
      })
      this.success(resData)
    } catch (error) {
      this.error(error.message)
    }
  }


  async get() {
    const { ctx } = this
    const { id, keyword, limit = 10 } = ctx.query

    let res

    if (id) {
      res = await ctx.service.common.get(ctx.query.id, 'Nav');
    } else if(keyword) {
      res = await ctx.service.nav.find(keyword, limit);
    }
    this.success(res)
  }

  async random() {
    const { ctx } = this
    const res = await ctx.service.common.getRandomData(10, 'Nav');
    this.success(res)
  }
}
