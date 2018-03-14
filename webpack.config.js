const path = require('path');

module.exports = {
	entry: ['./public/js/src/main.js'],
	output: {
		path: path.resolve(__dirname, './public/js/dist'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}