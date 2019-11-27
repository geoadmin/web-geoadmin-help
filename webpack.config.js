const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: "special/parameter.html",
            template: './src/special/parameter.html'
        }),
        new HtmlWebpackPlugin({
            filename: "special/parameter_en.html",
            template: './src/special/parameter_en.html'
        }),
        new HtmlWebpackPlugin({
            filename: "special/parameter_fr.html",
            template: './src/special/parameter_fr.html'
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            { from: 'src/img', to: 'img' },
            { from: 'src/favicon.ico', to: '' },
        ])
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/, use: 'babel-loader',
                include: [
                    path.resolve(__dirname, "src/js")
                ],
            },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
