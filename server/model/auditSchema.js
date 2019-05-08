const mongoose = require('mongoose')

const auditSchema = mongoose.Schema({
        classify: String,
        icon: String,
        name: String,
        href: String,
        desc: String,
        logo: String,
        time: Number,
    }, { collection: 'audit' })
    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('audit', auditSchema);