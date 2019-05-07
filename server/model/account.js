const mongoose = require('mongoose')

const account = mongoose.Schema({
        account: String,
        password: String,
    }, { collection: 'account' })

module.exports = mongoose.model('account', account);