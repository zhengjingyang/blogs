const router = require("koa-router")();
const fileController = require("../controllers/file");
const { verifyToken } = require("../utils/jwt");

router.post("/upload", verifyToken(true), fileController.upload); // 

module.exports = router;