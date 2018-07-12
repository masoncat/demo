/**
 * Created by wm.liu on 2017/12/17.
 */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const  CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};