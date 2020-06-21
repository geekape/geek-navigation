// jwt.js,token中间件
const expressJwt = require("express-jwt");
const { secretKey } = require('./config')
const jwtAuth = expressJwt({ secret: secretKey }).unless({ path: ["/api/nav/find" ,"/api/login", "/api/index"] });

module.exports = jwtAuth
