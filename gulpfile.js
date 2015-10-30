/**
 * Created by Administrator on 2015/10/23.
 */

'use strict';

var gulp = require('gulp');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');


gulp.task('webpack', function(callback) {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //	 // output options
            // }));
            callback();
        });
});

gulp.task('md5' , function(){

})

