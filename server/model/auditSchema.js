const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const auditSchema = mongoose.Schema({
        url: String,
        createAt: Number,
        categoryId: String,
    }, { collection: 'audit' })
    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('audit', auditSchema);