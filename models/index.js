const Book = require('./book.model')

// 根据 model 建立表
// Book.sync({
//   // force: true
//   alter: true
// }).then(() => {
//   console.log('check book table success')
// })

module.exports = {
  Book
}
