var crypto = require('crypto')
	redis = require('redis'),
	client = redis.createClient(),
	fs = require('fs'),
	en_config = require('../public/lang/en'),
	ch_config = require('../public/lang/ch'),
    Q = require("q");
client.on("error",function(err){
	console.log(err);
})
exports.md5 = function(str){
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}
exports.getLength = function(o){
	if((typeof o) == 'string') return o.length;
	if((typeof o) == 'object'){
		var j = 0;
		for(var i in o){
			j++;
		}
		return j;
	}
}
exports.session = function(id,callback){
	var data = [],
		$this = this;
	client.hgetall(id,function(err,reply){
		if(err) console.log(err);
		else{
			for(var i in reply){
				data[i] = reply[i];
			}
			client.hgetall("_config",function(err,res){
				if($this.getLength(data) == 0){
					callback(false);
				}
				else{
					callback(data);
				}
			});
		}
	})
}
exports.psession = function(id){
    var deferred = Q.defer();
    var data = [],
        $this = this;
    client.hgetall(id,function(err,reply){
        if(err) deferred.reject(err);
        else{
            for(var i in reply){
                data[i] = reply[i];
            }
            if($this.getLength(data) == 0){
                deferred.resolve(false);
            }
            else{
                deferred.resolve(data);
            }
        }
    });
    return deferred.promise;
}
exports.getSession = function(key,field,callback){
    this.existSession(key,field,function(rs){
        if(rs) client.hget(key,field,callback);
        else callback('no');
    })
}
exports.pgetSession = function(key,field){
    var deferred = Q.defer();
    this.pexistSession(key,field)
        .then(function(rs){
            if(rs) client.hget(key,field,function(err,r){
                if(err) deferred.reject(err);
                else deferred.resolve(r);
            });
            else {
                deferred.resolve('no');
            }
        });
    return deferred.promise;
}
exports.setSession = function(key,field,value,callback){
	client.hset(key,field,value,callback);
}
exports.existSession = function(key,field,callback){
    client.hexists(key,field,function(err,rs){
        callback(rs);
    });
}
exports.pexistSession = function(key,field){
    var deferred = Q.defer();
    client.hexists(key,field,function(err,rs){
        if(err) deferred.reject(err);
        else deferred.resolve(rs);
    });
    return deferred.promise;
}
exports.setAvatar = function(path,defaultImg,imgType){
	if(path == "") path = "/avatar/0_"+defaultImg+"."+imgType;
	fs.exists("public/"+path, function(exists){
		if(!exists) path = "/avatar/0_"+defaultImg+"."+imgType;
	}); 
	return path;
}