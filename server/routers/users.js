/**
 * restful api 子路由
 */

const router = require("koa-router")();
const userInfoController = require("../controllers/user-info");

const routers = router
  .get("/getUserInfo", userInfoController.getLoginUserInfo)
  .post("/signIn", userInfoController.signIn) // 登录操作
  .post("/signUp", userInfoController.signUp); // 注册操作

module.exports = routers;
