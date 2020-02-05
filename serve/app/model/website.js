module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const WebsiteSchema = new Schema({
    name: String,
    logo: String,
    url: String,
    desc: String,
    views: { type: Number, default: 0 },
    links: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now },
    author: {
      name: String,
      url: String
    }
  })
  return mongoose.model('Website', WebsiteSchema, 'website')
}
