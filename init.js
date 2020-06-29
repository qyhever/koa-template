const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }
  static initLoadRouters() {
    const modules = requireDirectory(module, `${__dirname}/routes`)
    for (const k in modules) {
      const route = modules[k]
      if (route instanceof Router) {
        InitManager.app.use(route.routes(), route.allowedMethods())
      }
    }
  }
  static loadConfig() {
    const configPath = __dirname + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager
