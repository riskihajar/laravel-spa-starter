const path = require('path')
const webpack = require('webpack')

module.exports = {
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    vue: {
        loaders: {
            scss: 'style!css!sass'
        }
    },
    plugins: [
        // new webpack.IgnorePlugin(/element-ui\/lib\/locale\/lang\/zh-CN/)
    ]
}
