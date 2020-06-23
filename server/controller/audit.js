const auditModel = require("../model/auditSchema")

const audit = {

  async add(req, res) {
    try {
      const resData = await auditModel.create(req.body)
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async del(req, res) {
    try {
      const resData = await auditModel.remove({ _id: req.body.id }, () => { })
      res.json(resData)
    } catch (error) {
      res.json(error)
    }
  },

  async list(req, res) {
    try {
      const resData = await auditModel.aggregate()
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