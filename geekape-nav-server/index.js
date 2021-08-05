const express = require('express')
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors');

var db = mongoose.connect('mongodb://yuanmeng:yuanmeng521@176.122.147.140:27017/navigation', { useNewUrlParser: true });

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})