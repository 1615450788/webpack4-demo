const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8033,
        host: "127.0.0.1",
    },
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    resolve:{
        alias: {
            // 'vue': 'vue/dist/vue.min',
        },
    },
    optimization:{
        runtimeChunk:true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, './index.html')
        }),
        new CleanWebpackPlugin([
            'dist',
            'build'
        ], {
            root: __dirname,
            verbose:  true,
            dry:      false
        }),
        // new BundleAnalyzerPlugin(),
    ],
}
