// webpack.base.js
// 存放 dev 和 prod 通用配置
module.exports = {
    entry: {
        index: './src/index-server.js', //入口
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            // 分离图片至imgs文件夹
                            name: 'imgs/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
