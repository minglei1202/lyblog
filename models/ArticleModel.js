var table = '236_articles',
	Tuser = '236_user',
    fields = {
        'owner_uid':'owner_uid',
        'title':'title',
        'content':'content',
        'create_time':'create_time',
        'update_time':'update_time',
        'view':'view',
        'reply':'reply',
        'status':'status',
        'collect_id':'collect_id'
    },
	base = require('./BaseModel');
exports.selectAll = function(callback){
	var sql = 'select A.*,B.id uid,B.name,B.avatar avatar,C.album album from '+ table+' A left join '+Tuser+' B on A.owner_uid = B.id left join 236_album C on A.collect_id = C.aid';
	mc.query(sql,callback);
}
exports.selectAllById = function(uid,callback){
	var sql = 'select A.*,B.id uid,B.name,C.album album from '+table+' A left join '+Tuser+' B on A.owner_uid = B.id left join 236_album C on A.collect_id = C.aid where A.owner_uid = '+uid;
	mc.query(sql,callback);
}
exports.insert = function(data,callback){
	data.push(base.getTime());
	data.push(base.getTime());
    mc.query('insert into ' + table + ' set '+ fields.title + ' =?,'+fields.content+'=?,'+fields.owner_uid+'=?,'+fields.collect_id+'=?,'+fields.create_time+'=?,'+fields.update_time+'=?',data,callback);
}
exports.findOne = function(id,callback){
	var sql = 'select * from '+table+' A left join '+Tuser+' B ON A.owner_uid = B.id where A.id='+id;
	setDec('view',id);
	mc.query(sql,callback);
}
exports.getUserByArticleId = function(id,callback){
	var id = id,
		Asql = 'select owner_uid from '+table+' where id='+id;
	mc.query(Asql,callback);
}
exports.rands = function(id,callback){
	this.getUserByArticleId(id,function(err,rs,next){
		if(err){
			console.log('This article has not owner!');
			next();
		}
		else{
			var uid = rs[0].owner_uid,
				sql = 'select * from '+table+' where owner_uid='+uid+' and id <> '+id+' order by rand() limit 5';
			mc.query(sql,callback);
		};
	});
}
function setDec(field,id){
	var sql = 'update '+table+' set '+field+' = '+field+' + 1 where id='+id;
	mc.query(sql,function(err,rs){
		if(err) console.log(err);
	})
}
