const auditModel = require("../model/auditSchema")
const request = require('request');
const cheerio = require('cheerio');

const audit = {

  async add(req, res) {
    try {
      const { url } = req.body
      req.body.status = 0
      let resData
      request(url, async (error, res, body) => {
        if (!error && res.statusCode == 200) {
          const $ = cheerio.load(body)
          const logo = `https://www.google.com/s2/favicons?domain=${url}`
          const name = $('title').text()
          const desc = $('meta[name="description"]').attr('content')

          resData = await auditModel.create({
            ...req.body,
            logo,
            name,
            desc,
            href: url,
          })
          
        } else {
          resData = await auditModel.create(req.body)
        }
      })
      res.json(resData)

    } catch (error) {
      res.json(error)
    }
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
    try {
      const resData = await auditModel.aggregate()
        .match({
          status: 0
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