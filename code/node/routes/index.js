var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var conf = require('../config');

/* GET home page. */
/**
 * 获取文章列表
 * @url       /
 * @method    GET
 * @return
 *  success{boolean} 是否保存成功 true|false
 *  errorMessage{string} 错误消息
 *  data{array} 文章列表
 *      name 文件名
 *      create 创建时间
 *      lastModify 最后更新时间
 */


router.get('/', function(req, res, next) {
    var src = path.join(process.cwd(), conf.markdownDir);
    var finalList = [];

    fs.readdir(src, function(err, files){
        if(err){
            return res.json({
                success: false,
                errorMessage: '服务器忙'
            });
        }
        files.forEach((item, index, list) => {
            var tmpArr = item.split('.');
            var strDocType = `.${tmpArr[tmpArr.length - 1]}`;
            var mdSrc = '';

            if(strDocType.toLowerCase() === '.md'){
                mdSrc = path.join(src, item);
                var sta = fs.statSync(mdSrc);
                finalList.push({
                    name: item.replace(strDocType, ''),
                    create: sta.ctime.toLocaleDateString(),
                    lastModify: sta.ctime.toLocaleDateString()
                });
            }
        });
        res.json({
            success: true,
            errorMessage: '',
            data: finalList
        });
    })
});

module.exports = router;
