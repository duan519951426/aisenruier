/* webpack配置 */
const webpack = require('webpack');

const config = {
    output: {
        filename: 'app.[name].js'
    },
    module: {
        loaders: [
            {test: /^.*\.css$/, loader: 'style-loader!raw-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = config;