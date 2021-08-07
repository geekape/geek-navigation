// jwt.js,token中间件
const expressJwt = require("express-jwt");
const appConfig = require("./config");
const jwtAuth = expressJwt({ secret: appConfig.secretKey }).unless({ path: [
    "/api/nav",
    "/api/nav/find",
  "/api/login",
  "/api/index",
  "/api/category/list"
] });

module.exports = jwtAuth
