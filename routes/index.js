const router = require('koa-router')()

const IndexController = require('@/controllers/index.controller')
const instance = new IndexController()

router.post('/login', instance.login)
router.get('/user', instance.currentUser)
router.post('/upload', instance.uploadFile)

module.exports = router
