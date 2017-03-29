const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',

  output: {
    filename: isProduction ? '[name].[hash].js' : '[name].js',
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
      title: 'react-resilient',
      template: 'index.html.ejs'
    })
  ]
};
