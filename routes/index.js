const router = require('koa-router')()
const { createParameterError, createAuthorizationError, createForbiddenError, createHttpError } = require('@/utils/error')


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  throw createHttpError('this is error')
  // ctx.body = 'koa2 string'
})

router.post('/json', async (ctx, next) => {
  // console.log('ctx.request.body', ctx.request.body)
  // console.log('ctx.request.files', ctx.request.files)
  // ctx.body = {
  //   title: 'koa2 json'
  // }
  throw new Error('this is a error')
})

module.exports = router
