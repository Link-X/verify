const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require("webpack-Hot-middleware")
const webpackOptions = require('./webpack.config.prod.js')
const path = require('path')
// 本地的开发环境默认就是使用 development mode
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions),
  express = require('express'),
  app = express(),
  DIST_DIR = path.join(__dirname, '..', 'dist')


const devMiddleware = webpackDevMiddleware(compiler, {
  // webpack-dev-middleware 的配置选项
  publicPath: webpackOptions.output.publicPath,
  quiet: true //向控制台显示任何内容 
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
})


app.use(devMiddleware)
app.use(hotMiddleware)
// app.use(express.static(DIST_DIR))

app.listen(3000, () => console.log('http://localhost:3000'))