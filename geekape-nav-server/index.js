const express = require('express')
const data = require('./router')
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors');
const config = require('./config');

var db = mongoose.connect(config.mongodbUrl, { useNewUrlParser: true });

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', data)

app.listen(3002, () => {
  console.log('http://localhost:3002')
})