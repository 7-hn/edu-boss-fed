// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// 托管静态资源，访问 / 默认会查找静态目录中的 index.html
app.use(express.static('./dist'))
app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagounews.com',
  changeOrigin: true // 把请求头中的 host 配置为 target
}))
app.use('/front', createProxyMiddleware({
  target: 'http://eduboss.lagounews.com/',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('start')
})
