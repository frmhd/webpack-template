var path = require('path');
var webpackConfig = require('./webpack.config');

var cssLoader = 'css-loader?sourceMap=inline?importLoaders=1';

webpackConfig.devtool = 'source-map';

webpackConfig.output = {
    pathinfo: true,
    publicPath: 'http://localhost:3000/build/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js'
};

webpackConfig.module.rules.push({
    test: /\.scss$/,
    use: [
        'style-loader',
        cssLoader,
        'postcss-loader?sourceMap=inline',
        'sass-loader'
    ]
});

webpackConfig.devServer = {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 3000
}

module.exports = webpackConfig;
