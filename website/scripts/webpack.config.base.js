/**
 * webpack base 配置
 */
const path = require('path');
const glob = require('fast-glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// page目录下面的所有组件作为入口
const entries = glob.sync('./src/pages/**/*/index.js', { case: true }).reduce((ret, file) => {
    const name = path.dirname(file).split('/').pop();
    ret[name.toLowerCase()] = file;
    return ret;
}, {});

const htmlWebpackPlugins = Object.keys(entries).map(entryName => new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: `${entryName}.html`,
    chunks: [entryName],
}));

// 配置webpack
module.exports = {
    entry: entries,
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'imgs/[name].[hash].[ext]',
                            publicPath: 'imgs',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        ...htmlWebpackPlugins,
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
    },
};
