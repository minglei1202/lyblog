var BaseControl = require('./BaseController'),
	UserModel = require('../models').User,
	Article = require('../models').Article,
	$ = require('jquery')(require("jsdom").jsdom().defaultView),
	redis = require('redis'),
	client = redis.createClient(),
	formidable = require('formidable'),
	im = require('imagemagick'),
	gm = require('gm'),
	imageMagick = gm.subClass({ imageMagick : true }),
	exec = require('child_process').exec,
	fs = require('fs');
client.on("error",function(err){
	console.log(err);
})
exports.login = function(req,res){
	var data = [],id = req.session.id;
	data['account'] = req.body.account;
	data['password'] = BaseControl.md5(req.body.password);
	UserModel.findOne(data,function(err,rs){
		if(!err && BaseControl.getLength(rs) > 0){
			client.hset(id,'name',data['account']);
			client.hset(id,'uid',rs[0].id);
			client.hset(id,'name',rs[0].name);
			client.hset(id,'avatar',rs[0].avatar);
			rs[0]['avatar'] = BaseControl.setAvatar(rs[0].avatar,'big','gif'); 
			res.send({status:1,info:rs[0]});
		}
		else res.send({status:0});
	})
}
exports.userInfo = function(req,res){
	var uid = req.params.uid,infos = [];
	//console.log(uid);
	if(uid != "undefined"){
		Article.selectAllById(uid,function(err,rs){
			BaseControl.session(req.session.id,function(r){
				UserModel.getArticleUpPlus(uid,function(err,usum){
					if(err) console.log(err);
					else{
						UserModel.getArticleNumById(uid,function(err,asum){
							if(err) console.log(err);
							else{
								infos['up'] = usum[0].up;
								infos['sum'] = asum[0].sum;
								infos['name'] = usum[0].name;
								infos['avatar'] = BaseControl.setAvatar(usum[0].avatar,"big","gif");
								rs.forEach(function(i){
									content = $(i.content).text();
									i.resume = content.substr(0,90);
									i.avatar = BaseControl.setAvatar(usum[0].avatar,"small","jpg");
								});
								res.render('info',{list:rs,session:r,info:infos});
							}
						});
					}
				});
			});
		});
	}else{
		res.send({});
	}
}
exports.logout = function(req,res){
	client.hdel(req.session.id,'account','uid','name','avatar',function(err){
		if(err) console.log(err);
		else res.redirect('/');
	});
}
exports.setting = function(req,res){
	BaseControl.session(req.session.id,function(r){
		//console.log(r);
		if(!r) res.redirect('/');
		else{
			r['avatar'] = BaseControl.setAvatar(r['avatar'],'big','gif');
			res.render('setting',{session:r});
		}
	});
}
exports.setAvatar = function(req,res){
	BaseControl.existSession(req.session.id,'uid',function(rs){
		if(rs){
			var form = new formidable.IncomingForm();
			form.encoding = 'utf-8';
			form.uploadDir = 'public/avatar'; //设置上传目录
			form.keepExtensions = true;	 //保留后缀
			form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
			form.on('progress',function(r,e){
				var per = (Math.round((r/e)*100))+"%";
				socket.emit('getper',per);
			});
			form.on('end',function(){
				var path = req.files.avatar.path;
				var originImg = imageMagick(path);
				var tmp = req.files.avatar.type.split('/');
				var imgType = tmp[1];
				exec('chmod 777 '+path,function(err){
					if(err) console.log(err);
					else{
						var data = [],where = [];
						BaseControl.getSession(req.session.id,'uid',function(err,v){
							originImg.resize(150, 150)
							.autoOrient()
							.write('public/avatar/'+v+"."+imgType,function(err){
								if(err) console.log(err);
								else res.send({status:1});
							});
							if(err == 'no') return res.send({status:'-1',info:'Sorry,no login!'});
							if(!err){
								where['id'] = v;
								data['avatar'] = "/avatar/"+v+"."+imgType;
								//BaseControl.setSession(req.session.id,'avatar',data['avatar'],null);
								UserModel.setFields(data,where,function(err){
									if(!err) console.log("success!");
								})
							}
						});
					}
					//im.resize({
					//  srcPath: path,
					//  dstPath: 'public/images/aa.jpg',
					//  width:   256
					//}, function(err, stdout, stderr){
					//  if (err) console.log(err);
					//  console.log('resized kittens.jpg to fit within 256x256px');
					//});
					//res.send({status:1});
				})
			})
		}else{
			res.send({status:'-1'});
		}
	})
}
exports.setPwd = function(req,res){
	var oldpwd = BaseControl.md5(req.body.pwd),
		newpwd = BaseControl.md5(req.body.newpwd);
	BaseControl.getSession(req.session.id,'uid',function(err,rs){
		if(err == 'no') return res.send({status:'-1',info:'Sorry,no login!'});
		if(err) console.log(err);
		else{
			var data = [],info;
			data['id'] = rs;
			data['password'] = oldpwd;
			UserModel.checkUser(data,function(err,v){
				if(err) console.log(err);
				else{
					console.log(v.length);
					if(v.length == 0){
						info = {status:0,info:'Old password error!'}
						res.send(info);
					}else{
						var update = [];
						update['password'] = newpwd;
						UserModel.setFields(update,data,function(err,msg){
							if(err) console.log(err);
							else res.send({status:1,info:'Success!'});
						});
					}
				}
			});
		}
	})
}