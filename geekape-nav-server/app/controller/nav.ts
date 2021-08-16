import Controller from '../core/base_controller';
const request = require('request');
const cheerio = require('cheerio');

enum NAV_STATUS {
  pass,
  wait,
  refuse,
}

export default class NavController extends Controller {
  tableName(): string {
    return 'Nav'
  }

  async list() {
    const { ctx } = this
    const { model } = ctx
    let { status = 0, categoryId, name } = ctx.query

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

    await super.getList(findParam);
  }

  async add() {
    this.ctx.request.body.status = NAV_STATUS.wait
    this.ctx.request.body.createTime = new Date()
    await super.add()
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
    await super.remove();
  }

  async edit() {
    this.ctx.request.body.updateTime = new Date()
    const { tags } = this.ctx.request.body
    if (Array.isArray(tags)) {
      await this.ctx.service.tag.addMultiTag(tags)
    }
    await super.update();
  }

  async audit() {
    const { ctx } = this
    this.ctx.request.body.auditTime = new Date()

    const { status, id } = this.ctx.request.body

    const navItem = await this.ctx.model.Nav.findOne({ _id: id })
    const { tags } = navItem

    if (status === NAV_STATUS.pass) {
      // 批量添加tag
      await this.ctx.service.tag.addMultiTag(tags)
    }
    await super.update();
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
    const { id, keyword } = ctx.query

    let res

    if (id) {
      res = await super.get();
    } else if(keyword) {
      let reg = new RegExp(keyword,'i');
      await super.getList({
        name: { $regex: reg },
      }, (table)=> table.limit(10));
    }
  }

  async random() {
    await super.getRandomList();
  }

  async ranking() {
    const [view, star, news] = await Promise.all([
        this.service.nav.findMaxValueList('view'),
        this.service.nav.findMaxValueList('star'),
        this.service.nav.findMaxValueList('createTime'),
    ])

    this.success({
      view,
      star,
      news
    })
  }
}
