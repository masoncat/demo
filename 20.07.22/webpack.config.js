const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
    },
    plugin:[
        new HtmlWebpackPlugin({
            title: 'Development'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer:{
        contentBase: './dist'
    }
};