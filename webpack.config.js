var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

// Is the current build a development build
var isDev = (process.env.NODE_ENV === 'dev');
// Add style source maps on dev mode
var cssLoader = isDev ? 'css-loader?importLoaders=1?sourceMap' : 'css-loader';
var styleLoader = 'style-loader';

module.exports = {
    entry: {
        vendor: [
            'jquery'
        ],
        bundle: path.join(__dirname, 'src/assets/js/main'),
    },
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, 'src/assets/js')
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // jQuery
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery',
        }),

        new BundleTracker({filename: './webpack-stats.json'})

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
                test: /\.twig$/,
                use: [
                    'twig-loader'
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
                test: /\.(jpe*g|png|gif|ttf|woff|woff2|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
