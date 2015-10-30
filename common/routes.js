/**
 * Created by Justin on 2015/7/9.
 */
var index = require('../controller/index');
var users = require('../controller/users');
var admin = require('../controller/admin');
var _ = require("lodash");

var routes = {
    "/" : index,
    "/admin" : admin
};

module.exports = function(app){

    app.use(function(req, res, next){
        //console.log(req);
        next();
    })

    _.forEach(routes,function( i , j ){
        app.use( j , i );
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

};