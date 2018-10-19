'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"https://www.easy-mock.com/mock/5b95cdca9b7e7a16f787f702/example"'
  BASE_API: '""' // 开发环境后端接口地址，请根据实际情况自行修改
})
