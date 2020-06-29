const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const logger = require('koa-logger')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

require('module-alias/register')
const errorHandler = require('./middlewares/error')
const cors = require('./middlewares/cors')
const { createNotFoundError } = require('./utils/error')

// error handler
app.use(errorHandler)

// middlewares
app.use(koaBody({
  jsonLimit: '10mb',
  formLimit: '15mb',
  multipart: true
}))
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// cors
app.use(cors)

// routes
const modules = requireDirectory(module, `${__dirname}/routes`)
for (const k in modules) {
  const route = modules[k]
  if(route instanceof Router) {
    app.use(route.routes(), route.allowedMethods())
  }
}

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
