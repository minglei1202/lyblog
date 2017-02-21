var table = '236_album',
    fields = {
        'aid':'aid',
        'album':'album',
        'info':'info',
        'owner_uid':'owner_uid',
        'owner_uid':'owner_uid',
        'is_public':'is_public',
        'morder':'morder',
        'dateline':'dateline',
        'lastline':'lastline',
        'status':'status'
    },
	base = require('./BaseModel'),
    Q = require("q");
exports.insert = function(data){
    var deferred = Q.defer();
	data['dateline'] = data['lastline'] = base.getTime();
	var keyValues = base.keyValues(data);
	var sql = "insert into " + table + " (" + keyValues[0] + ")values(" + keyValues[1] + ")";
	//console.log(sql);
	mc.query(sql,function(err,rs){
        if(err) deferred.reject(err);
        else deferred.resolve(rs)
    });
    return deferred.promise;
}
exports.preInsert = function(aid){
    var sql = "insert into "+table+"_0 (aid)values("+aid+")";
    mc.query(sql,function(err,rs){
        if(err) console.error(err);
    });
}
exports.getAlbumList = function(isPublic,uid){
    var deferred = Q.defer(),where = [];
    where['is_public'] = isPublic;
    var sql = "select A.*,B.name name,C.num num from "+table+" A left join 236_user B on A.owner_uid = B.id left join 236_album_0 C on A.aid = C.aid where "+base.arrToStr(where);
    if(uid) sql += " OR A.owner_uid = " + uid;
    //console.log(sql);
    mc.query(sql,function(err,rs){
        if(err) deferred.reject(err);
        else deferred.resolve(rs);
    });
    return deferred.promise;
}
exports.getAlbumByAid = function(aid){
    var deferred = Q.defer();
    var sql = "select album from "+table+" where aid = "+aid;
    //console.log(sql);
    mc.query(sql,function(err,rs){
        if(err) deferred.reject(err);
        else deferred.resolve(rs[0].album);
    });
    return deferred.promise;
}
exports.checkData = function(data,callback){
	var where = base.arrToStr(data);
	var sql = "select * from "+table+" where "+where;
	mc.query(sql,callback);
}