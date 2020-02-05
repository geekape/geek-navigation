// 分类表

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const CategorySchema = new Schema({
    name: String,
    categoryId: String
  })
  return mongoose.model('Category', CategorySchema, 'category')
}
