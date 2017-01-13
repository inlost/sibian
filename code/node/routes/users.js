var express = require('express');
var router = express.Router();
var conf = require('../config');

/* GET users listing. */

router.post('/', function(req, res, next) {
    var userName = req.body.username;
    var password = req.body.password;
    var result = {
        success: false,
        errorMessage: '用户名或密码错误'
    }
    if(userName === conf.username &&
        password === conf.password){
        result.success = true;
        result.errorMessage = '';
        res.cookie('isLogin', 'true', {expires: 0, signed:true});
    }

    res.json(result);
});

module.exports = router;
