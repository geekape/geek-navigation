const express = require('express');
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")




//这一句是连接上数据库
// var db = mongoose.connect('mongodb://localhost:27017/navData');
var db = mongoose.connect('mongodb://47.75.178.162:27017/navigation');

//这里的myDbs是数据库的名字，不是表的名字


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)
app.listen(3000, () => {
    console.log('app listening on port 3000.')
})