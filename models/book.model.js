const Sequelize = require('sequelize')
const sequelize = require('../database/mysql')

const Book = sequelize.define('book', {
  name: {
    type: Sequelize.STRING,
    comment: '书名'
  },
  author: {
    type: Sequelize.STRING,
    comment: '作者'
  },
  description: {
    type: Sequelize.STRING,
    comment: '描述'
  }
  // category: {
  //   type: Sequelize.STRING,
  //   comment: '分类'
  // }
}, {
  // options
  // tableName: 't_book' // 自定义表名
})

module.exports = Book
