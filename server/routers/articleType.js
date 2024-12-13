const router = require('koa-router')()

const articleType = require('../controllers/articleType')
const { verifyToken} = require("../utils/jwt")
router.post('list', articleType.getList)
router.post('add', verifyToken(true), articleType.add)
router.post('update', verifyToken(true), articleType.update)
router.post('delete', verifyToken(true), articleType.delete)

module.exports = router
