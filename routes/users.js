var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.userid);
  res.redirect('../plan/index.html');
});


// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
  userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
  userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
  userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
  userDao.update(req, res, next);
});

router.post('/postCommand', function(req, res, next) {
  //userDao.update(req, res, next);
  console.log('postCommand:' + JSON.stringify(req.body));
  if(req.body.command == "getallplangroup"){
    console.log('getallplangroup');
    userDao.queryAll(req, res, next);
  }else if(req.body.command == "getallplan"){
    console.log('getallplan');
    userDao.queryAll(req, res, next);
  }
});


module.exports = router;
