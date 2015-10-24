/**
 * Created by Justin on 2015/10/24.
 */
var express = require('express');
var router = express.Router();
var baseFolder = "admin/";

router.get('/login', function(req, res, next) {
    res.render(baseFolder + 'common', {
        "modelName" : "login" ,
        "layout" : baseFolder + "layout"
    });
});

router.get(['/', '*'], function(req, res, next) {
    res.render(baseFolder + 'common', {
        "modelName" : "index" ,
        "layout" : baseFolder + "layout"
    });
});


module.exports = router;