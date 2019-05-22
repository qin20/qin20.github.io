/**
 * 开换环境webpack配置
 */
const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.config.base');

const port = 7899;
const host = '0.0.0.0';
const devServer = `http://${host}:${port}/`;

module.exports = Object.assign({}, webpackBaseConfig, {
    mode: 'development',
    output: {
        publicPath: devServer,
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        contentBase: path.join(__dirname, '../dist'),
        host,
        port,
        overlay: false,
        stats: {
            all: false,
            assets: true,
            chunks: true,
            errors: true,
            warnings: true,
        },
    },
    optimization: Object.assign({}, webpackBaseConfig.optimization, {
        minimize: false,
    }),
    plugins: [].concat(webpackBaseConfig.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ]),
});
