const mongoose = require('mongoose')

const navSchema = mongoose.Schema({
        title: String,
        icon: String,
        subData: {
            title: String,
            href: String,
            des: String,
            logo: String
        }
    }, { collection: 'mynav' })
    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('nav', navSchema);