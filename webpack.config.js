const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 這個套件在3.0版本以後需要將它解構出來

module.exports = {
    mode: "development",
    entry: "./hello.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: { // 配置loader
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] // 加入postcss-loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'  // 要用的模板路徑
        }),
        new CleanWebpackPlugin()
    ]
}