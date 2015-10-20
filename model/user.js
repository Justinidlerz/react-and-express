/**
 * Created by Justin on 2015/7/10.
 */
var sql = require("../common/sql");
var users = new sql({ tableName: "user" });

var user = {
    getUsers : function(callback){
        var _this = this;
        users.find(function (err, rows, fields) {
            callback.apply(_this,arguments);
        });
    }
};

module.exports  = user;