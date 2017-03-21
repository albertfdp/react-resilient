const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loaders: ['style-loader', 'css-loader?modules']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-resilent',
      template: 'index.html.ejs'
    })
  ]
};
