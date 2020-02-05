// 审核表

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CategorySchema = new Schema({
    categoryId: { type: String, default: "" },
    url: { type: String, default: "" },
    status: { type: String, default: "wait" }, // pass, reject, wait
    createTime: { type: Date, default: Date.now },
  })
  return mongoose.model('Audit', CategorySchema, 'audit')
}
