const commonConfig = {
  privateKey: 'this is prevate key'
}

const config = {
  development: {
    // ...
  },
  production: {
    // ...
  }
}[process.env.NODE_ENV]

module.exports = {
  ...commonConfig,
  ...config
}
