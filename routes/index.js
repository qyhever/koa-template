const router = require('koa-router')()
const { createParameterError, createAuthorizationError, createForbiddenError, createHttpError } = require('@/utils/error')
const { generateToken } = require('@/utils/jwt')

router.get('/login', async (ctx) => {
  const { username, password } = ctx.query
  if (!username) {
    throw createParameterError('param username is required')
  }
  if (!password) {
    throw createParameterError('param password is required')
  }
  const token = generateToken({
    username,
    password
  })
  ctx.body = {
    success: true,
    data: {
      token
    }
  }
})

router.get('/user', async ctx => {
  ctx.body = {
    success: true,
    data: ctx.state.user
  }
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
