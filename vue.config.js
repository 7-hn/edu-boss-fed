/** @type { import('vue').Configuration } */

module.exports = {
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true, // 把请求头中的 host 配置为 target
        logLevel: 'debug'
      },
      '/front': {
        target: 'http://eduboss.lagounews.com/',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  // 共享全局变量：所有组件都能用该文件中的样式
  css: {
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
