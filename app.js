const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const koaLogger = require('koa-logger')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

require('module-alias/register')
const errorHandler = require('./middlewares/error')
const cors = require('./middlewares/cors')
const removeFavicon = require('./middlewares/favicon')
const { handleAuthorizationError, verifyToken, decodedAuthorization } = require('./middlewares/authorization')
const logger = require('./middlewares/logger')
const { createNotFoundError } = require('./utils/error')

app.use(removeFavicon)

// error handler
app.use(errorHandler)

// middlewares
app.use(koaBody({
  jsonLimit: '10mb',
  formLimit: '15mb',
  multipart: true
}))
app.use(koaLogger())
app.use(require('koa-static')(`${__dirname}/public`))

// logger
app.use(logger)
// cors
app.use(cors)

// handle 401
app.use(handleAuthorizationError)

// verify token
app.use(verifyToken)

// decoded authorization
app.use(decodedAuthorization)

// routes
const modules = requireDirectory(module, `${__dirname}/routes`)
for (const k in modules) {
  const route = modules[k]
  if(route instanceof Router) {
    app.use(route.routes(), route.allowedMethods())
  }
}

// 404 not found
app.use(() => {
  throw createNotFoundError()
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  ctx.body = {
    success: false,
    msg: err.message
  }
})

module.exports = app
