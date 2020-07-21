const jwt = require('jsonwebtoken')

const userModel = require("../model/userSchema")
const config = require('../config')

const user = {

  async login(req, res) {
    try {
      const users = await userModel.findOne()
      console.log(users, 'users')
      if (!users) {
        // 没有管理员，默认设置一个
        await userModel.create(req.body)
      } else {
        const { username, password } = req.body

        if (username != users.username || password != users.password) {
          res.json({
            status: 400,
            msg: '账号或密码错误',
          })
        }
      }

      let token = 'Bearer ' + jwt.sign({}, config.secretKey, {
        expiresIn: 60 * 60 * 24,
      })

      res.json({
        token
      })
    } catch (error) {
      res.json(error)
    }
  }
}

module.exports = user
