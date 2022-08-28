// 基础路径 注意发布之前要先修改这里
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
          return {
              plugins: [
                  new BundleAnalyzerPlugin()
              ]
          }
      }
  },
  // 本地开发环境跨域配置
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { 
        '/cpmsService-api': {
        target: 'http://localhost:8001',   // 请求后端接口域名地址
        ws: true,
        changeOrigin: true,  //是否跨域
        pathRewrite: {
           '^/cpmsService-api':''
        }
      }
    },
    
  },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    entry
      .end()
  },
  css: {
    extract: { ignoreOrder: true }
  }
}