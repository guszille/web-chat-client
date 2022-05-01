const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config()

const port = process.env.PORT || 8000;

module.exports = {
    mode: 'development',

    entry: './src/app.js',

    output: {
        filename: 'bundle.[hash].js'
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: { modules: true, sourceMap: true }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            // Transfering "process.env" variables through transpiled version.
            process: {
                env: JSON.stringify(process.env)
            }
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html'
            // favicon: 'public/favicon.ico'
        })
    ],

    devServer: {
        host: 'localhost',
        open: false,
        port: port,
        historyApiFallback: true
    }
};
