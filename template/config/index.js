'use strict'

module.exports = {
  dev: {
    proxyTable: {
      /* 开发环境后端接口代理地址，请根据实际情况自行修改
      例如将'/api/xxx'代理到'http://rap2api.taobao.org/app/mock/95082/xxx'
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/95082/', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: { '^/api': '' } // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
      }
      */
    },
    port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
  },
  build: {}
}
