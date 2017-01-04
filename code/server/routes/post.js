var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', function(req, res, next) {
    console.log(req.query);
    var blogId = req.query.id;

    res.send({
        title: '一篇博客',
        content: '博客正文博客正文博客正文博客正文博客正文博客正文博客正文博客正文博客正文'
    })
  //res.render('post', {query: req.query, body: req.body, files: req.files, title: '服务器form接收测试' });
});

module.exports = router;

