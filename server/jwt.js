// jwt.js,token中间件
const expressJwt = require("express-jwt");
const { secretKey } = require('./config')
const jwtAuth = expressJwt({ secret: secretKey }).unless({ path: ["/api/login", "/api/index", "/api/audit/add", "/api/nav/find"] });

module.exports = jwtAuth
