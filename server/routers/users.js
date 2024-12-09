/**
 * restful api 子路由
 */

const router = require("koa-router")();
const userInfoController = require("../controllers/user-info");

const routers = router
  .get("/getUserInfo", userInfoController.getLoginUserInfo)
  .post("/signIn", userInfoController.signIn)
  .post("/signUp", userInfoController.signUp);

module.exports = router;
