var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// Is the current build a development build
var isDev = (process.env.NODE_ENV === 'dev')
// Add style source maps on dev mode
var cssLoader = isDev ? 'css-loader?importLoaders=1?sourceMap' : 'css-loader'
var styleLoader = 'style-loader'

module.exports = {
  entry: {
    vendor: [
      'jquery'
    ],
    bundle: path.join(__dirname, 'app/js/main')
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'app/blocks'),
      path.join(__dirname, 'app/js')
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    }),

    new BundleTracker({filename: './webpack-stats.json'}),
    new HtmlWebpackPlugin({
      template: 'app/index.pug',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
            // BABEL
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      },

            // templates
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },

            // STYLES
      {
        test: /\.css$/,
        use: [
          styleLoader,
          cssLoader,
          'postcss-loader'
        ]
      },

            // IMAGES
      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name]-[hash].[ext]'
        }
      },

      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  }
}
