const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const pug = require('./webpack/pug');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'public/assets'),
    build: path.join(__dirname, 'public/dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/js/index.js',
            'catalog': PATHS.source + '/js/catalog.js',
            'lesson': PATHS.source + '/js/lesson.js',
            'error': PATHS.source + '/js/error.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new CleanWebpackPlugin(['public/dist']),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/index.pug'),
                chunks: ['index', 'common'],
                filename: 'index.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/catalog.pug'),
                chunks: ['catalog', 'common'],
                filename: 'catalog.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/lesson.pug'),
                chunks: ['lesson', 'common'],
                filename: 'lesson.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['index', 'catalog', 'lesson']
            })
        ],
    },
    pug(),
    images(),
    fonts()
]);


module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCss(),
            uglifyJs()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
};