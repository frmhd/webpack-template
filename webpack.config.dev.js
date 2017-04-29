var path = require('path')
var webpackConfig = require('./webpack.config')

var cssLoader = 'css-loader?importLoaders=1'

webpackConfig.devtool = 'source-map'

webpackConfig.output = {
  pathinfo: true,
  publicPath: '/',
  path: path.resolve(__dirname, 'build'),
  filename: '[name].[hash].js'
}

webpackConfig.module.rules.push({
  test: /\.styl$/,
  use: [
    'style-loader',
    cssLoader,
    'postcss-loader?sourceMap=inline',
    'stylus-loader'
  ]
})

webpackConfig.devServer = {
  contentBase: path.join(__dirname, 'build'),
  compress: true,
  port: 3000
}

module.exports = webpackConfig
