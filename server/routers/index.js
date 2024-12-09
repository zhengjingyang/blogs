/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const user = require('./users.js')
const error = require('./error.js')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
module.exports = router