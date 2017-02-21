/**
 * Created by Administrator on 14-1-18.
 */
var Article = require('../models').Article,
	User = require('../models').User,
    Album = require('../models').Album,
	BaseControl = require('./BaseController');
exports.doPublish = function(req,res){
	BaseControl.session(req.session.id,function(r){
		if(!r) return res.send({status:0,info:'对不起，你尚未登录！'});
		var title = req.body.title,
			content = req.body.content,
            aid = req.body.aid,
			userInfo = r,
			data = [title,content,userInfo['uid'],aid],
			info;
		if(title === '' || content === '' || aid === ''){
			info = {status:0,info:'填写不能为空'};
			return res.send(info);
		}
		Article.insert(data,function(err,rs){
			if(!err) info = {status:1,info:'发表成功'};
			else info = {status:0,info:'发表失败，请联系管理员'};
			res.send(info);
		});
	})
}
exports.view = function(req,res){
	var id = req.params.name,data = [];
	Article.findOne(id,function(err,rs){
		if(!err){
			Article.rands(id,function(err,rand){
				if(err){
					rand = null;
					console.log('Something was wrong for sql');
				}
				BaseControl.session(req.sessionID,function(r1){
					Article.getUserByArticleId(id,function(err,r){
						if(err) console.log(err);
						else{
							data['id'] = r[0].owner_uid;
							User.findOne(data,function(err,v){
								if(err) console.log(err);
								else{
									v[0]['avatar'] = BaseControl.setAvatar(v[0].avatar,"big","gif");
									res.render('view',{info:rs[0],session:r1,rand:rand,userInfo:v[0]});
								}
							})
						}
					});
				});
			});
		}
	})
}
exports.publish = function(req,res){
    if(req.params.group === undefined) res.redirect("/select-album");
    else {
        var aid = req.params.group,info = [];
        BaseControl.psession(req.session.id)
            .then(function(data){
                Album.getAlbumByAid(aid)
                    .then(function(album){
                        info['aid'] = aid;
                        info['album'] = album
                        res.render('post',{session:data,info:info});
                    },function(err){
                        console.error(err);
                        res.send();
                    });
            },function(err){
                console.error(err);
                res.send();
            });
    }
}