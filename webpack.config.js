const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
	let isProductionMode = (env && env.production) || process.env.production === 'true' || false;
	let devtool;
	const plugins = [new NodemonPlugin()];

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
		resolve: {
			modules: [path.join(__dirname, 'src'), 'node_modules'],
			extensions: ['.ts', '.js', '.json'],
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
