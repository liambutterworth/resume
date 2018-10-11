const CleanWebpackPlugin      = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin       = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const UglifyJsPlugin          = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	plugins: [
		new CleanWebpackPlugin( [ 'dist' ], { watch: true } ),
		new HtmlWebpackPlugin( { template: 'src/index.html' } ),
		new MiniCssExtractPlugin( { filename: '[name].[hash].css' } ),
	],

	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin( {} ),
			new UglifyJsPlugin( { cache: true, parallel: true } ),
		],
	},

	output: {
		filename: '[name].[hash].js',
	},

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
			use:     `url-loader?limit=8192&context=${ __dirname }/src&name=assets/images/[name].[hash].[ext]`,
		}, {
			test:    /\.(ttf|eot|woff(2)?)$/,
			exclude: /node_modules/,
			use:     'url-loader?limit=8192&name=assets/fonts/[name].[hash].[ext]',
		}],
	},
};
