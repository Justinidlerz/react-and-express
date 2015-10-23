var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,//'cheap-module-eval-source-map',
  entry: {
    "admin-login" : './Static/src/admin/js/login',
    "admin-index" : './Static/src/admin/js/index'
  },
  output: {
    path: path.join(__dirname, 'Static/js'),
    filename: '[name].js',
    publicPath: '/Static/'
  },
  plugins : [
    new webpack.optimize.CommonsChunkPlugin('admin-common.js')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    },{
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};