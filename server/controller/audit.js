const auditModel = require("../model/auditSchema")
const request = require('request');
const cheerio = require('cheerio');

const audit = {

  add(req, res) {
    const { url, name } = req.body
    req.body.status = 0
    req.body.logo = `https://www.google.com/s2/favicons?domain=${url}`

    // 手动输入
    if (name) {
      auditModel.create(req.body, (err, doc)=> {
        res.json({ data: doc })
      })
      return
    }

    request(url, (error, requestData, body) => {
      if (!error && requestData.statusCode == 200) {
        const $ = cheerio.load(body)
        const name = $('title').text()
        const desc = $('meta[name="description"]').attr('content')
        auditModel.create({
          ...req.body,
          name,
          desc,
          href: url,
        }, (err, doc)=> {
          res.json({ data: doc })
        })
      } else {
        res.json({
          code: 0,
          msg: '爬虫爬取失败',
        })
      }
    })
  },

  async del(req, res) {
    try {
      const resData = await auditModel.update({ _id: req.body.id }, { status: 2 })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async list(req, res) {
    const { status = 0 } = req.query

    try {
      const resData = await auditModel.aggregate()
        .match({
          status: Number(status)
        })
        .lookup({
          from: "category",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        })

      res.json({
        data: resData
      })
    } catch (error) {
      res.json(error)
    }
  },
}

module.exports = audit