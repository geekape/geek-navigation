const mongoose = require('mongoose')

const navSchema = mongoose.Schema({
        sortName: String,
        icon: String,
        subData: {
            name: String,
            href: String,
            desc: String,
            logo: String
        }
    }, { collection: 'mynav' })
    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('nav', navSchema);