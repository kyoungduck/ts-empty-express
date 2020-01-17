const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

module.exports = (env, argv) => {
    let isProductionMode = (env && env.production) || process.env.production === 'true' || false;
    let devtool;
    const plugins = [new MiniCssExtractPlugin({ filename: 'app.css' }), new NodemonPlugin()];

    if (isProductionMode) {
        isProductionMode = 'production';
        devtool = false;
        plugins.push(new CleanWebpackPlugin());
    } else {
        isProductionMode = 'development';
        devtool = 'inline-source-map';
    }

    return {
        target: 'node',
        mode: isProductionMode,
        devtool,
        entry: './src/index',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            sourceMapFilename: '[file].map',
            publicPath: '/',
        },
        devServer: {
            hot: true,
            host: 'localhost',
            port: 3000,
            contentBase: path.resolve(__dirname, 'build'),
        },
        resolve: {
            modules: [path.join(__dirname, 'src'), 'node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.json'],
            plugins: [new TsconfigPathsPlugin()],
        },
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                },
                {
                    // Images
                    test: /\.(png|svg|jpe?g|gif)$/,
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        limit: 10000,
                    },
                },
                {
                    // Font files.
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: 'file-loader',
                },
                {
                    // css, scss files.
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    exclude: /node_modules/,
                    test: /\.graphql$/,
                    use: [{ loader: 'graphql-import-loader' }],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        externals: [nodeExternals()],
        plugins,
    };
};
