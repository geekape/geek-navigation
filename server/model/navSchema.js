const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const navSchema = mongoose.Schema({
  categoryId: String,
  name: String,
  href: String,
  desc: String,
  logo: String,
  list: {
    type: [Object],
    default: undefined
  }
}, { collection: 'nav' })
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

module.exports = mongoose.model('nav', navSchema);
