import Controller from './common';
const request = require('request');
const cheerio = require('cheerio');

export default class NavController extends Controller {
  async list() {
    const { ctx } = this
    const { request, model } = ctx
    try {
      let { pageSize = 10, pageNumber = 1, status = 0, categoryId } = request.query
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

      const [resData, total] = await Promise.all([
        model.Nav.find(findParam).skip(skipNumber).limit(pageSize).sort({_id: -1}),
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
      const { url, name } = req.body
      req.body.status = 1
      req.body.logo = `https://www.google.com/s2/favicons?domain=${url}`
      req.body.href = url
      req.body.submitTime = new Date()

      // if (req.isLogin) {
      //   // 已经登录了，提交网站直接审核通过
      //   req.body.status = 0
      // }

      // 手动输入
      if (name) {
        model.Nav.create(req.body, (_err, doc) => {
          this.success(doc)
        })
        return
      }

      request(url, (error, requestData, body) => {
        if (!error && requestData.statusCode == 200) {
          const $ = cheerio.load(body)
          const name = $('title').text()
          const desc = $('meta[name="description"]').attr('content')
          model.Nav.create({
            ...req.body,
            name,
            desc,
            href: url,
          }, (_err, doc) => {
            this.success(doc)
          })
        } else {
          this.error('爬虫爬取失败')
        }
      })
    } catch (error) {
      this.error(error.message)
    }
  }

  async del() {
    const { id } = this.ctx.request.body
    const res = await this.ctx.service.common.remove(id, 'Nav');
    this.success(res)
  }

  async edit() {
    const { body } = this.ctx.request
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
}
