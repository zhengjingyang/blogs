const router = require("koa-router")();
const articleController = require("../controllers/article");
const { verifyToken } = require("../utils/jwt");

router.get("/list", articleController.getList); // 
router.post("/add", verifyToken(true), articleController.add); // 
router.post("/edit", verifyToken(true), articleController.edit); // 
router.get("/delete", verifyToken(true), articleController.delete); // 

module.exports = router;
