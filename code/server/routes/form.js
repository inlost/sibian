var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', function(req, res, next) {
  res.render('form', {query: req.query, body: req.body, files: req.files, title: '服务器form接收测试' });
});

module.exports = router;
