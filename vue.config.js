module.exports = {
  css: {
    loaderOptions: {
      // 给 scss-loader 传递选项
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
}
