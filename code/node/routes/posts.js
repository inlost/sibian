var express = require('express');
var router = express.Router();
var md = require('node-markdown').Markdown;
var fs = require('fs');
var path = require('path');

//读取本地markdown，渲染成html返回
router.get('/', function(req, res, next) {
    var strHtml = '';
    var strFile = '';
    var filename = req.query.p;
    var src = path.join(process.cwd(), 'md', `${filename}.md`);

    fs.readFile(src, 'utf-8', function(err, data){
        if(err){
            return res.send('服务器开小差了.');
        }
        strHtml = md(data);
        res.send(strHtml);
    });
});

//通过post过来的markdown字符串，渲染成html返回
router.post('/', function(req, res, next) {
    var strHtml = '';

    strHtml = md(req.body.content)

    if(req.body.type === 'save'){
        const src = path.join(process.cwd(), 'md', `${req.body.title}.md`);
        let rst = {};

        if(typeof req.body.title === 'undefined' || !req.body.title.length){
            rst = {
                success : false,
                errorMessage: '标题不能为空'
            }
            return res.send(rst);
        }

        fs.writeFile(src, req.body.content, function(err){
            rst.success = err ? false : true;
            res.send(rst);
        });
    }else{
        res.send(strHtml);
    }
})

module.exports = router;
