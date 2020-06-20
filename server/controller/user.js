const jwt = require('jsonwebtoken')

const userModel = require("../model/userSchema")
const { secretKey } = require('../config')

class User {
  constructor() {

  }

  async login(req, res) {
    try {
      const { account, pwd } = req.body

      // const users = await userModel.find()
      // const {username, password} = users[0]

      if (account != 'admin' || pwd != 'admin') {
        res.json({
          status: 400,
          msg: '账号或密码错误',
        })
      }

      let token = 'Bearer ' + jwt.sign({}, secretKey, {
        expiresIn: 60 * 60 * 24 // 授权时效24小时
      })

      res.json({
        status: 200,
        msg: 'ok',
        token
      })
    } catch (error) {
      res.json(error)
    }
  }
}

module.exports = new User()