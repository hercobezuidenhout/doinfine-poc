const path = require('path')
const pathToPublic = path.join(__dirname, 'public')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: pathToPublic, // absolute path on machine to where to output the bundle
        filename: 'bundle.js' // can rename this to anything
    },
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@providers': path.resolve(__dirname, 'src/providers'),
            '@tests': path.resolve(__dirname, 'src/__tests__'),
            '@services': path.resolve(__dirname, 'src/services')
        }
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader','scoped-css-loader', 'sass-loader']
            }
        ]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        liveReload: true,
        historyApiFallback: true
    }
}