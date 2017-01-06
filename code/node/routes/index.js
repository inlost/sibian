var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    var src = path.join(process.cwd(), 'md');
    var finalList = [];

    fs.readdir(src, function(err, files){
        if(err){
            return res.send('服务器忙');
        }
        console.log(files);
        files.forEach((item, index, list) => {
            var tmpArr = item.split('.');
            var strDocType = `.${tmpArr[tmpArr.length - 1]}`;

            if(strDocType.toLowerCase() === '.md'){
                finalList.push(item.replace(strDocType, ''))
            }
        });
        res.send({list: finalList});
    })
});

module.exports = router;
