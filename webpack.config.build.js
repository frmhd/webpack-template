var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpackConfig = require('./webpack.config')

var extractStyles = new ExtractTextPlugin('css/[name].[hash].css')

webpackConfig.devtool = false

webpackConfig.plugins.push(
    new CleanWebpackPlugin(['build']),
    extractStyles
)

webpackConfig.module.rules.push({
  test: /\.css$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'postcss-loader'
    ]
  }),

  test: /\.styl$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'postcss-loader',
      'stylus-loader'
    ]
  })
})

webpackConfig.output = {
  path: path.join(__dirname, 'build'),
  filename: 'js/[name].[hash].js'
}

module.exports = webpackConfig
