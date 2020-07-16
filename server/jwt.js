// jwt.js,token中间件
const expressJwt = require("express-jwt");
const { secretKey } = require('./config')
const jwtAuth = expressJwt({ secret: secretKey, algorithms: ['RS256'] }).unless({ path: [
  "/api/nav/find",
  "/api/audit/add",
  "/api/login",
  "/api/index",
  "/api/category/list"
] });

module.exports = jwtAuth
