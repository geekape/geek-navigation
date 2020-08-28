const navDB = require("../model/navSchema")
const categoryDB = require("../model/categorySchema")
const request = require('request');
const cheerio = require('cheerio');

const nav = {
  async list(req, res) {
    try {
      let { pageSize = 10, pageNumber = 1, status = 0, categoryId } = req.query
      pageSize = Number(pageSize)
      pageNumber = Number(pageNumber)
      const skipNumber = pageSize * pageNumber - pageSize

      let findParam = { status }
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
        navDB.find(findParam).skip(skipNumber).limit(pageSize).sort({_id: -1}),
        navDB.find(findParam).count(),
      ])
      res.json({
        data: resData,
        total,
        pageNumber: Math.ceil(total / pageSize),
      })
    } catch (error) {
      res.json(error)
    }
  },

  async add(req, res) {
    try {
      const { url, name } = req.body
      req.body.status = 1
      req.body.logo = `https://www.google.com/s2/favicons?domain=${url}`
      req.body.href = url

      if (req.isLogin) {
        // 已经登录了，提交网站直接审核通过
        req.body.status = 0
      }

      // 手动输入
      if (name) {
        navDB.create(req.body, (err, doc) => {
          res.json({ data: doc })
        })
        return
      }

      request(url, (error, requestData, body) => {
        if (!error && requestData.statusCode == 200) {
          const $ = cheerio.load(body)
          const name = $('title').text()
          const desc = $('meta[name="description"]').attr('content')
          navDB.create({
            ...req.body,
            name,
            desc,
            href: url,
          }, (err, doc) => {
            res.json({ data: doc })
          })
        } else {
          res.json({
            code: 0,
            msg: '爬虫爬取失败',
          })
        }
      })
    } catch (error) {
      res.json(error)
    }
  },

  async del(req, res) {
    try {
      const resData = await navDB.remove({ _id: req.body.id })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async edit(req, res) {
    try {
      const { id, status } = req.body
      delete req.body.id

      const resData = await navDB.update({ _id: id }, req.body)
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  /**
   * 取出一级分类下面的所有网站，并且处理返回
   */
  async info(req, res) {
    try {
      const { id, categoryId } = req.body
      let resData = []
      // 取所有子分类
      const categorys = await categoryDB.find({ categoryId })
      const categoryIds = categorys.reduce((t, v) => [...t, v._id], [])

      const navs = await navDB.find({
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

      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  }
}
module.exports = nav
