const router = require("koa-router")();
const articleController = require("../controllers/article");
const { verifyToken } = require("../utils/jwt");

router.post("/list", articleController.getList); // 
router.post("/add", verifyToken(true), articleController.add); // 
router.post("/update", verifyToken(true), articleController.edit); // 
router.get("/delete", verifyToken(true), articleController.delete); // 
router.get("/detail", articleController.detail); //

module.exports = router;
