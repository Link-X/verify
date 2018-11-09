const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}
module.exports = {
    entry: {
        main: './src/index.js' // 入口
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: resolve("node_modules"), // 路径在 node_modules 目录下的都作为公共部分
                    name: "vendor", // 使用 vendor 入口作为公共部分
                    enforce: true
                }
            }
        }
    },
    output: {
        path: resolve('dist'), // 出口
        filename: '[name].js',
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".json"], // 查找文件顺序
        alias: {
            "@": resolve('src') // 路径别名
        }
    },
    module: {
        rules: [{
            test: /\.js$/, // 用 babel-loader 解析js
            loader: 'babel-loader',
            include: [resolve('src')]
        }]
    },
    plugins: [
        new UglifyPlugin(), // 压缩文件
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            minify: { // 压缩 HTML 的配置
                minifyJS: true // 压缩 HTML 中出现的 JS 代码
            }
        })
    ]
}