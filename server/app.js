const express = require('express');
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
// const expressJwt = require("express-jwt");



//这一句是连接上数据库
// var db = mongoose.connect('mongodb://localhost:27017/navData');
var db = mongoose.connect('mongodb://47.75.178.162:27017/navigation');

//这里的myDbs是数据库的名字，不是表的名字


const app = express()
// app.use(expressJwt({ secret: '123456', credentialsRequired: false, }).unless({ path: ['/api/index', '/api/login'] }));

// app.use(function (err, req, res, next) {
//     console.log(err, req)
//     if (err.name === 'UnauthorizedError') {
//         return res.status(401).send({
//             status: 401,
//             msg: 'No token provided.'
//         });
//     }
    
//     next()
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)
app.listen(3000, () => {
    console.log('app listening on port 3000.')
})