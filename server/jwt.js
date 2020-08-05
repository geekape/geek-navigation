// jwt.js,token中间件
const expressJwt = require("express-jwt");
const appConfig = require("../nuxt.config");
const jwtAuth = expressJwt({ secret: appConfig.env.secretKey }).unless({ path: [
  "/api/nav/find",
  "/api/nav/add",
  "/api/nav/edit",
  "/api/login",
  "/api/index",
  "/api/category/list"
] });

module.exports = jwtAuth
