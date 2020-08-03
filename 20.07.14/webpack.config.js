const path = require('path');
const MyPlugin = require('./Myplugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    plugins:[new MyPlugin()]
}