var mq = require("mysql"),
	pool = mq.createPool({
		host:"localhost",
		user: "root",
		password: "root",
		database: "somethings",
		port: 3306
	});
global.mc = null;
pool.getConnection(function(err,conn){
	if(err) console.log("pool err:"+err);
	else mc = conn;
});

var User = require('./UserModel');
var Article = require('./ArticleModel');
var Album = require('./AlbumModel');
exports.User = User;
exports.Article = Article;
exports.Album = Album;
