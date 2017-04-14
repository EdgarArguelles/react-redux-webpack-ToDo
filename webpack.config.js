'use strict';
const webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: {
    app: ['./src/app/App.js']
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // babel
      {test: /\.js?$/, exclude: [/node_modules/], loader: 'babel-loader'},
      // index
      {test: /index.html$/, loader: 'file-loader?name=[name].[ext]'},
      // assets
      {test: /\.(eot|ico|png|jpg)$/, loader: 'file-loader?name=assets/[name].[ext]'},
      // sass
      {test: /\.scss/, loaders: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  }
};