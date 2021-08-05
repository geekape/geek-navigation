const mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @param status
 * 0/undefined 审核通过
 * 1 审核未通过
 * 2 审核被拒绝
 */
const navSchema = mongoose.Schema({
  categoryId: String,
  name: String,
  href: String,
  desc: String,
  logo: String,
  authorName: String,
  authorUrl: String,
  view: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 0
  },
  list: {
    type: [Object],
    default: undefined
  }
}, { collection: 'nav' })
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

module.exports = mongoose.model('nav', navSchema);
