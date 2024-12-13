/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const user = require('./users.js')
const article = require('./article.js')
const file = require('./file.js')
const error = require('./error.js')
const articleType = require('./articleType.js')


router.use('/user', user.routes(), user.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/file', file.routes(), file.allowedMethods())
router.use('/articleType', articleType.routes(), articleType.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
module.exports = router