// jwt.js,token中间件
const expressJwt = require("express-jwt");
const appConfig = require("./config");
const jwtAuth = expressJwt({ secret: appConfig.secretKey }).unless({ path: [
  "/api/nav/find",
  "/api/nav/add",
  "/api/nav/edit",
  "/api/login",
  "/api/index",
  "/api/category/list"
] });

module.exports = jwtAuth
