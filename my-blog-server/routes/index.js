var express = require('express');
var router = express.Router();

var mysql_dbc = require('../db/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

var passport = require('passport');
var NaverStrategy = require('passport-naver').Strategy;
var secret_config = require('../db/db_info');


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new NaverStrategy({
    clientID: secret_config.federation.naver.client_id,
    clientSecret: secret_config.federation.naver.secret_id,
    callbackURL: secret_config.federation.naver.callback_url
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      // @todo Remove necessary comment
      //console.log("profile=");
      //console.log(profile);
      // data to be saved in DB
      user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName,
        provider: 'naver',
        naver: profile._json
      };
      //console.log("user=");
      //console.log(user);
      return done(null, profile);
    });
  }
));

// naver 로그인
router.get('/auth/login/naver',
  passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/login/callback',
  passport.authenticate('naver', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/Login'
  })
);

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('http://localhost:3000/');
});

router.get('/userid', ensureAuthenticated, function(req, res) {
  console.log({ user: req.user });
    res.json({ user: req.user });
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('http://localhost:3000/Login');
}

/* GET home page. */
router.get('/api/items', function(req, res, next) {
  var stmt = 'select * from items';
  connection.query(stmt, function (err, result) {
    console.log(result);
    res.json(result);
  })
});

// GET ALL MENUS
router.get('/api/menus', function(req,res){
  var stmt = 'select * from menus';
  connection.query(stmt, function (err, result) {
    console.log(result);
    res.json(result);
  })
});


// GET ONE MENU
router.get('/api/menus/:menuid', function(req,res){
  var stmt = 'select * from menus where id = ' + req.params.menuid;
  connection.query(stmt, function (err, result) {
    console.log(result);
    res.json(result);
  })
});

// GET ALL ITEMS BY MENU
router.get('/api/items/:menuid', function(req,res){
  var stmt = 'select * from items where menuid = ' + req.params.menuid;
  connection.query(stmt, function (err, result) {
    console.log(result);
    res.json(result);
  })
});

/* GET home page. */
router.get('/api/:itemid', function(req, res, next) {
  var stmt = 'select * from items where id = ' + req.params.itemid;
  connection.query(stmt, function (err, result) {
    console.log(result);
    res.json(result);
  })
});

//POST ADD MENU
router.post('/api/menus/add', function(req,res){

  var stmt = 'insert into menus(name, parent, depth, isFolder, description, BGColor, fontColor) values (\''+req.body.name+'\', 0, 1, \'N\',\''+req.body.description+'\',\''+req.body.BGColor+'\',\''+req.body.fontColor+'\')';
  
  connection.query(stmt, function (err, result) {
    console.log(result);
    console.log(stmt);
    res.json(result);
  })
});

//PUT MODIFY MENU
router.put('/api/menus/modify', function(req,res){

  var stmt = 'update menus set name = \''+req.body.name+'\', description = \''+req.body.description+'\', BGColor = \''+req.body.BGColor+'\', fontColor = \''+req.body.fontColor+'\' where id = \''+req.body.id+'\'';
  
  connection.query(stmt, function (err, result) {
    console.log(result);
    console.log(stmt);
    res.json(result);
  })
});

//DELETE MENU
router.delete('/api/menus/delete/:menuid', function(req,res){

  var stmt = 'delete from menus where id = ' + req.params.menuid;
  
  connection.query(stmt, function (err, result) {
    console.log(result);
    console.log(stmt);
    res.json(result);
  })
});

router.post('/api/items/add', function(req,res){

  var stmt = 'insert into items(name, content, menuid) values (\''+req.body.name+'\', \''+req.body.content+'\', \''+req.body.menuid+'\')';
  
  connection.query(stmt, function (err, result) {
    console.log(result);
    console.log(stmt);
    res.json(result);
  })
});

module.exports = router;
