const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
}