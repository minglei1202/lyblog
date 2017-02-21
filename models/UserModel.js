var table = '236_user',
	Tarticle = '236_articles',
    fields = {
        'account':'account',
        'name':'name',
        'password':'password',
        'last_login_time':'last_login_time',
        'status':'status',
    },
	base = require('./BaseModel');
exports.select = function(sql,callback){
	mc.query(sql,callback);
}
exports.findOne = function(data,callback){
	var where = "",j=1,length = base.getLength(data);
	for(var i in data){
		if(j == length){
			where = where + ' '+i+'="'+data[i]+'"';
		}else{
			where = where + ' '+i+'="'+data[i]+'" AND';
		}
		j++;
	}
	var sql = 'select * from '+table+' where'+where;
	//console.log(sql);
	mc.query(sql,callback);
}
exports.setFields = function(arr,where,callback){
	var where = base.arrToStr(where),
		sets = base.arrToStr(arr);
	var sql = 'update '+table+' set'+sets+'where'+where;
	//console.log(sql);
	mc.query(sql,callback);
}
exports.checkUser = function(array,callback){
	var where = base.arrToStr(array);
	var sql = 'select * from '+table+' where'+where;
	mc.query(sql,callback);
}
exports.getArticleNumById = function(uid,callback){
	var sql = 'select count(*) sum from '+Tarticle+' where owner_uid = '+uid;
	//console.log(sql);
	mc.query(sql,callback);
}
exports.getArticleUpPlus = function(uid,callback){
	var sql = 'select sum(A.up) up,B.name name,B.avatar avatar from '+Tarticle+' A left join '+table+' B on A.owner_uid = B.id where A.owner_uid = '+uid;
	//console.log(uid);
	mc.query(sql,callback);
}
exports.getNameById = function(uid,callback){
	var sql = 'select name from '+table+' where id = '+uid;
	mc.query(sql,callback);
}