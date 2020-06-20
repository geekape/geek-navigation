const categoryModel = require("../model/categorySchema")

const category = {
  async list(req, res) {
    try {
      const data = await categoryModel.find({})
      res.json({ data })
    } catch (error) {
      res.json(error)
    }
  },
  async add(req, res) {
    try {
      const resData = await categoryModel.create(req.body)
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },
  async edit(req, res) {

  },
  async del(req, res) {
    try {
      const data = await categoryModel.remove({ _id: req.body.id }, () => { })
      res.json(data)
    } catch (error) {
      res.json(error)
    }
  },
}

module.exports = category