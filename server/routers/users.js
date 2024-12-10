/**
 * restful api 子路由
 */

const router = require("koa-router")();
const userController = require("../controllers/user-info");
const { verifyToken } = require("../utils/jwt");

router.get("/getUserInfo", verifyToken(true), userController.getLoginUserInfo); // 获取用户信息
router.post("/signIn", userController.signIn); // 登录操作
router.post("/signUp", userController.signUp); // 注册操作

module.exports = router;
