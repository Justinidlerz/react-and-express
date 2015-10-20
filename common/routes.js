/**
 * Created by Justin on 2015/7/9.
 */
var index = require('../controller/index');
var users = require('../controller/users');
var _ = require("lodash");

var routes = {
    '/' : index,
    '/users' : users
};


module.exports = function(app){

    app.use(function(req, res, next){
        //console.log(req);
        next();
    })

    _.forEach(routes,function( i , j ){
        app.use( j , i );
    });

};