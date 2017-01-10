var express = require('express');
var router = express.Router();
var md = require('node-markdown').Markdown;
var fs = require('fs');
var path = require('path');
var conf = require('../config');

//读取本地markdown，渲染成html返回
router.get('/', function(req, res, next) {
    var strHtml = '';
    var strFile = '';
    var filename = req.query.p;
    var src = path.join(process.cwd(), conf.markdownDir, `${filename}.md`);

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

    //获取到浏览器发送的博客内容[conetend],并渲染成HTML
    if(typeof req.body.content !== 'undefined'){
        strHtml = md(req.body.content)
    }

    //判断是保存还是预览
    if(req.body.type === 'save'){
        //保存逻辑

        const src = path.join(process.cwd(), conf.markdownDir, `${req.body.title}.md`);
        let rst = {};

        if(typeof req.body.title === 'undefined' || !req.body.title.length){
            rst = {
                //是否成功
                success : false,
                //错误信息
                errorMessage: '标题不能为空'
            }
            return res.send(rst);
        }
        if(typeof req.body.content === 'undefined' || !req.body.content.length){
            rst = {
                //是否成功
                success : false,
                //错误信息
                errorMessage: '内容不能为空'
            }
            return res.send(rst);
        }

        fs.writeFile(src, req.body.content, function(err){
            if(err){
                rst.success = false;
            }else{
                rst.success = true;
            }
            res.send(rst);
        });
    }else{
        //预览逻辑
        res.send(strHtml);
    }
})

/**
 * @url       /post
 * @method    DELETE
 * @params
 *  q{string} 文件名
 */

router.delete('/', function(req, res, next){
    var filename = req.body.p;
    var src = path.join(process.cwd(), conf.markdownDir, `${filename}.md`);

    fs.unlink(src, function(err){
        var rst = {};
        rst.success = err ? false : true;
        res.send(rst)
    });
})

module.exports = router;
