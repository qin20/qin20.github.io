/**
 * 生产环境webpack配置
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackBaseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, webpackBaseConfig, {
    mode: 'production',
    // devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/website/dist/',
    },
    optimization: Object.assign({}, webpackBaseConfig.optimization, {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
            }),
        ],
        moduleIds: 'hashed',
        namedChunks: true,
    }),
    plugins: (webpackBaseConfig.plugins || []).concat([
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
        }),
    ]),
});
