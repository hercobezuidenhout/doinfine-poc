const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const pathToPublic = path.join(__dirname, 'public')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: pathToPublic, // absolute path on machine to where to output the bundle
        filename: 'bundle.js', // can rename this to anything,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@providers': path.resolve(__dirname, 'src/providers'),
            '@tests': path.resolve(__dirname, 'test'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@pages': path.resolve(__dirname, 'src/pages')
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
                use: ['style-loader', 'css-loader', 'scoped-css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './src/assets/favicon.svg'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
        }),
        new WebpackPwaManifest({
            name: 'TeamLunch',
            description: 'Keep your team accountable!',
            background_color: '#f44336',
            icons: [
                {
                    src: path.resolve('src/assets/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512]
                }
            ],
            shortcuts: [
                {
                    name: "Fine Someone",
                    short_name: "Fines",
                    description: "Submit a new fine request",
                    url: "/fine",
                    icons: []
                },
                {
                    name: "Pay Fine",
                    short_name: "Payments",
                    description: "Submit a new payment request",
                    url: "/payment",
                    icons: []
                },
                {
                    name: "Active Fine Requests",
                    short_name: "Fine Requests",
                    description: "View active fine requests",
                    url: "/fine-requests",
                    icons: []
                },
                {
                    name: "Active Payment Requests",
                    short_name: "Payment Requests",
                    description: "View active payment requests",
                    url: "/payment-requests",
                    icons: []
                },
            ]
        }),
        new Dotenv()
    ],
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