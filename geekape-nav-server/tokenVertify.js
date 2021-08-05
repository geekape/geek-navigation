const jwt = require('jsonwebtoken')
const appConfig = require("./config");

exports.setToken = function () {
  return new Promise((resolve, reject) => {
    const token = 'Bearer ' + jwt.sign({
      admin: 'admin'
    }, appConfig.secretKey, {
      expiresIn: 60 * 60 * 24,
    })
    resolve(token)
  })
}

exports.verToken = function (token) {
  return new Promise((resolve, reject) => {
    const info = jwt.verify(token.split(' ')[1], appConfig.secretKey);
    resolve(info)
  })
}
