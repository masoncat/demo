const path = require('path')

module.exports = {
    entry: './a.js',
    mode: 'development',
    devtool:'nosources-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}