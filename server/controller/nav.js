const navDB = require("../model/navSchema")
const categoryDB = require("../model/categorySchema")
const auditDB = require("../model/auditSchema")

const nav = {
  async index(req, res) {
    try {
      const { pageSize = 20, pageNumber = 1 } = req.query
      const skipNumber = pageSize * pageNumber - pageSize
      const [resData, total] = await Promise.all([
        navDB.find().skip(skipNumber).limit(pageSize),
        navDB.count(),
      ])
      res.json({
        data: resData,
        total
      })
    } catch (error) {
      res.json(error)
    }
  },

  async add(req, res) {
    try {
      const { auditId } = req.body
      delete req.body.auditId
      delete req.body._id
      await auditDB.update({ _id: auditId }, { status: 1 })
      const resData = await navDB.create(req.body)
      res.json(resData)
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
      const { id } = req.body
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
        categoryId: { $in: categoryIds }
      })

      categorys.map(category=> {
        const nowNavs = navs.filter(nav=> nav.categoryId == category._id)
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
