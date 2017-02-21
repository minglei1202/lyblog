/**
 * Created by Administrator on 14-1-18.
 */
var BaseControl = require('./BaseController'),
	Album = require('../models').Album,
    Q = require("q");
exports.index = function(req,res){
	BaseControl.session(req.session.id,function(r){
		if(!r) res.redirect('/');
		else res.render('album',{session:r});
	});
}
/*exports.addAlbum = function(req,res){
	var album = req.body.album,
		info = req.body.info,
		is_public = req.body.is_public,
		morder = req.body.morder;
	var data = [],where = [];
	data['album'] = album;
	data['info'] = info;
	data['is_public'] = is_public;
	data['morder'] = morder;
	where['album'] = album;
	Album.checkData(where,function(err,v){
		var length = v.length;
		if(length) res.send({status:-1});
		else{
			BaseControl.getSession(req.session.id,'uid',function(err,r){
				if(!r){res.send({status:-2});}
				else{
					data['owner_uid'] = r;
					Album.insert(data,function(err,rs){
						if(err){
							console.log(err);
							info = {status:0};
						}
						else info = {status:1};
						res.send(info);
					});
				}
			});
		}
	});
}*/
exports.addAlbum = function(req,res){
    var album = req.body.album,
        info = req.body.info,
        is_public = req.body.is_public,
        morder = req.body.morder;
    var data = [],where = [];
    data['album'] = album;
    data['info'] = info;
    data['is_public'] = is_public;
    data['morder'] = morder;
    where['album'] = album;
    if(album !== ""){
        Album.checkData(where,function(err,v){
            var length = v.length;
            if(length) res.send({status:-1});
            else{
                BaseControl.pgetSession(req.session.id,'uid')
                 .then(function(r){
                     if(r == "no"){
                         res.send({status:-2});
                     }
                     else{
                         data['owner_uid'] = r;
                         Album.insert(data)
                             .then(function(rs){
                                 Album.preInsert(rs.insertId);
                                 res.send({status:1});
                             },function(err){
                                 console.error(err);
                                 res.send({status:0});
                             })
                     }
                 },function(err){
                     console.error(err);
                 });
            }
        });
    }else{
        res.send({status:-3});
    }
}
exports.square = function(req,res){
	BaseControl.session(req.session.id,function(r){
        Album.getAlbumList(1,null)
            .then(function(rs){
                //console.log(rs);
                res.render('square',{session:r,list:rs});
            },function(err){
                console.error(err);
                res.send();
            });
	});
}
exports.selectAlbum = function(req,res){
    BaseControl.psession(req.session.id)
        .then(function(data){
			var uid = data.uid || null;
            Album.getAlbumList(1,uid)
                .then(function(rs){
                    res.render('selectAlbum',{session:data,list:rs});
                },function(err){
                    console.error(err);
                    res.send();
                });
        },function(err){
            console.error(err);
            res.send();
        });
}
