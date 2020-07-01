const { generateToken } = require('@/utils/jwt')
const { createParameterError } = require('@/utils/error')

class IndexController {
  async login(ctx) {
    const { username, password } = ctx.request.body
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
  }
  async currentUser(ctx) {
    ctx.body = {
      success: true,
      data: ctx.state.user
    }
  }
  async uploadFile(ctx) {
    console.log('ctx.request.files', ctx.request.files)
    throw new Error('upload failed!')
  }
}

module.exports = IndexController
