const navData = require("../model/navSchema")
const auditModel = require("../model/auditSchema")

const nav =  {

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
      await auditModel.remove({ _id: req.body.id })
      const resData = await navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } })
      if (resData.err.n === 0) navData.create(req.body, function () { })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async del(req, res) {
    try {
      const resData = await navData.update({ _id: req.body.id }, { $pull: { sites: { name: req.body.name } } }, () => { })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async edit(req, res) {
    try {
      const { id, sites: {
        href
      } } = req.body

      await navData.update({ _id: id }, { $pull: { sites: { href: href } } }, (success, err) => {
      })
      const resData = await navData.update({ classify: req.body.classify }, { $push: { sites: req.body.sites } })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async info(req, res) {
    try {
      const { id } = req.body
      const resData = await navData.find({ _id: id })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  }
}
module.exports = nav