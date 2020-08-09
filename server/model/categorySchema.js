const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    categoryId: String,
    createAt: Number,
    icon: {
      type: String,
      default: ''
    },
    children: [{
        name: String,
        categoryId: String,
        createAt: Number,
    }],
}, { collection: 'category' })


module.exports = mongoose.model('category', categorySchema);
