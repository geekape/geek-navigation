const mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * @param status 审核状态：0待审核，1审核成功，2拒绝
 */
const auditSchema = mongoose.Schema({
        url: String,
        logo: String,
        href: String,
        desc: String,
        name: String,
        createAt: Number,
        categoryId: String,
        status: Number,
    }, { collection: 'audit' })
    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('audit', auditSchema);
