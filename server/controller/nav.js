const navData = require("../model/navSchema")
const auditModel = require("../model/auditSchema")

const nav = {

  async index(req, res) {
    try {
      const resData = await navData.find({})
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async add(req, res) {
    try {
      const { auditId } = req.body
      delete req.body.auditId
      delete req.body._id
      await auditModel.update({ _id: auditId }, {status: 1})
      const resData = await navData.create(req.body)
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async del(req, res) {
    try {
      const resData = await navData.remove({ _id: req.body.id })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async edit(req, res) {
    try {
      const { id } = req.body
      delete req.body.id

      const resData = await navData.update({ _id: id }, req.body)
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async info(req, res) {
    try {
      const { id } = req.body
      const resData = await navData.aggregate([
        {
          $lookup:
          {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
          }
        }
      ])
      .match({
        categoryId: id
      })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  }
}
module.exports = nav