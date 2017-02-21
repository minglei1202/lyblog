/**
 * Created by Administrator on 14-1-18.
 */
var Article = require('../models').Article,
    $ = require('jquery')(require("jsdom").jsdom().defaultView),
    BaseControl = require('./BaseController'),
    fs = require('fs');

exports.index = function(req,res){
    var sid = null;
    try{
        sid = req.sessionID;
    }catch(err){
        console.error(err);
    }
    Article.selectAll(function(err,rs){
        rs.forEach(function(i){
            //console.log(i.avatar);
            // 判断文件是否存在
            if(i.avatar == "") i.avatar = "/avatar/0_small.jpg";
            fs.exists("public/"+i.avatar, function(exists){
                if(!exists) i.avatar = "/avatar/0_small.jpg";
            });
            content = $(i.content).text();
            i.resume = content.substr(0,90);
        });
        BaseControl.session(sid,function(r){
            //console.log(r);
            res.render('index',{list:rs,session:r});
        });

    });
}
