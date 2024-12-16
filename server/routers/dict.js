const router = require('koa-router')()
const dictController = require('../controllers/dict')
const { verifyToken } = require('../utils/jwt')

router.post('/list', dictController.getList) //
router.get('/dictDataById', verifyToken(true), dictController.getDataById) //
router.post('/add', verifyToken(true), dictController.add) //
router.post('/update', verifyToken(true), dictController.edit) //
router.get('/delete', verifyToken(true), dictController.delete) //

module.exports = router