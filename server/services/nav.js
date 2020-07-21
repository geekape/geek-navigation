const common = require('./common')
const navModel = require("../model/navSchema")

class nav extends common {
  constructor(ctx) {
    super(ctx)
    this.table = navModel.find()
  }

  async getList() {
    const {skipNumber, pageSize} = this.initParam()
    const res = await this.table.find().skip(skipNumber).limit(pageSize)
    return res
  }
}

module.exports = nav
