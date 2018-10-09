const CleanWebpackPlugin   = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin    = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	output: {
		filename: '[name].[hash].js',
	},

	plugins: [
		new CleanWebpackPlugin( [ 'dist' ] ),
		new HtmlWebpackPlugin( { template: 'src/index.html' } ),
		new MiniCssExtractPlugin( { filename: '[name].[hash].css' } ),
	]
	
	module: {
		rules: [{
			test:    /\.js$/,
			exclude: /node_modules/,
			use:     [ 'babel-loader', 'eslint-loader' ],
		}, {
			test:    /\.css$/,
			exclude: /node_modules/,
			use:     [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?includePaths[]=src' ],
		}, {
			test:    /\.svg$/,
			exclude: /node_modules/,
			use:     'svg-inline-loader',
		}, {
			test:    /\.(jpg|png)$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=assets/images/[name].[hash].[ext]',
		}, {
			test:    /\.(ttf|eot|woff(2)?)$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=assets/fonts/[name].[hash].[ext]',
		}],
	},
};
