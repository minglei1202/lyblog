var express = require('express');
var router = express.Router();
var HomeCtl = require('./HomeController');
var ArticleCtl = require('./ArticleController');
var AlbumCtl = require('./AlbumController');
var UserCtl = require('./UserController');

router.get('/', HomeCtl.index);
router.get('/view/:name',ArticleCtl.view);
router.get('/publish',ArticleCtl.publish);
router.get('/select-album',AlbumCtl.selectAlbum);
router.get('/publish/:group',ArticleCtl.publish);
router.post('/login',UserCtl.login);
router.get('/setting',UserCtl.setting);
router.post('/setAvatar',UserCtl.setAvatar);
router.get('/logout',UserCtl.logout);
router.get('/add-album',AlbumCtl.index);
router.post('/addAlbum',AlbumCtl.addAlbum);
router.post('/dopublish',ArticleCtl.doPublish);
router.get('/user/:uid',UserCtl.userInfo);
router.get('/square',AlbumCtl.square);

module.exports = router;
