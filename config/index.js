const commonConfig = {
  privateKey: 'this is prevate key'
}

const config = {
  development: {
    mysqlConfig: {
      database: 'koa_template_db',
      username: 'root',
      password: '123456',
      host: 'localhost'
    }
  },
  production: {
    mysqlConfig: {
      database: 'koa_template_db',
      username: 'root',
      password: '123456',
      host: 'localhost'
    }
  }
}[process.env.NODE_ENV]

module.exports = {
  ...commonConfig,
  ...config
}
