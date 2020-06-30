module.exports = async (ctx, next) => {
  if (ctx.url === '/favicon.ico') {
    ctx.status = 200
  } else {
    await next()
  }
}
