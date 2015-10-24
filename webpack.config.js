var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,//'cheap-module-eval-source-map',
  entry: {
    "admin-login" : './public/src/admin/js/login',
    "admin-index" : './public/src/admin/js/index'
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
    publicPath: '/public/'
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