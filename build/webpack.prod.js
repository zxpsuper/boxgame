// webpack.prod.js
// 存放 prod 配置
const path = require('path')
// 合并配置文件
const merge = require('webpack-merge')
const common = require('./webpack.base.js')
// 打包之前清除文件
const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    entry: './src/index-server.js', //入口
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../lib'),
        library: 'Tool', // 导出的类名，可用于 html 引入后 new Tool()
        libraryExport: 'default',
        libraryTarget: 'umd',
        filename: 'Tool.umd.min.js', // tool 可以改成你的 toolname
    },
    plugins: [
        new CleanWebpackPlugin(['lib/*'], {
            root: path.resolve(__dirname, '../'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
    ],
})
