var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.config');

var extractSass = new ExtractTextPlugin('[name].[hash].css');
var extractTwig = new ExtractTextPlugin('[name].[hash].html');

webpackConfig.devtool = false;

webpackConfig.plugins.push(
    new CleanWebpackPlugin(['build']),
    extractSass,
    extractTwig
);

webpackConfig.module.rules.push({
    test: /\.css$/,
    loader: extractSass.extract({
        fallback: "style-loader",
        use: [
            'css-loader',
            'postcss-loader'
        ]
    }),

    test: /\.twig$/,
    loader: extractTwig.extract({
        use: [
            'twig-loader'
        ]
    }),

    test: /\.scss$/,
    loader: extractSass.extract({
        fallback: "style-loader",
        use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
    })
});

webpackConfig.output = {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js'
};

module.exports = webpackConfig;
