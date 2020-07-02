const router = require('koa-router')()
const BookController = require('@/controllers/book.controller')

const instance = new BookController()
router.prefix('/book')

router.get('/', instance.query)
router.post('/', instance.createOrUpdate)
router.post('/batchDelete', instance.remove)

module.exports = router
