const { Op } = require('sequelize')
const { Book } = require('@/models')
const { createParameterError } = global.err

class BookController {
  async query(ctx) {
    const data = await Book.findAll()
    ctx.body = {
      success: true,
      data
    }
  }
  async createOrUpdate(ctx) {
    const { id, name, author, description } = ctx.request.body
    console.log('params', { name, author, description })
    if (!name) {
      throw createParameterError('param name is required')
    }
    if (!author) {
      throw createParameterError('param author is required')
    }
    if (!description) {
      throw createParameterError('param description is required')
    }
    const where = {
      name
    }
    if (id) {
      // 跳过 这个 id
      where[Op.not] = [ { id } ]
    }
    const doc = await Book.findOne({
      where
    })
    if (doc) {
      ctx.body = {
        success: false,
        data: null,
        msg: '已存在该书名'
      }
      return
    }
    let data = null
    if (!id) {
      data = await Book.create({ name, author, description })
    } else {
      data = await Book.update(
        {
          name,
          author,
          description
        },
        {
          where: {
            id
          }
        }
      )
    }
    ctx.body = {
      success: true,
      data,
      msg: '保存成功'
    }
  }
  async remove(ctx) {
    const idList = ctx.request.body
    if (!Array.isArray(idList)) {
      throw createParameterError('param body must be a array')
    }
    const data = await Book.destroy({
      where: {
        id: {
          [Op.in]: idList
        }
      }
    })
    ctx.body = {
      success: true,
      data,
      msg: '删除成功'
    }
  }
}

module.exports = BookController
