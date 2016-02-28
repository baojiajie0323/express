var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.userid);
  res.redirect('../plan/index.html?userid=' + req.query.userid);
});

router.post('/postCommand', function(req, res, next) {
  console.log('postCommand:' + JSON.stringify(req.body));
  if(req.body.command == "getallplangroup"){
    console.log('getallplangroup');
    userDao.queryallgroup(req, res, next);
  }else if(req.body.command == "getallplan"){
    console.log('getallplan');
    userDao.queryallplan(req, res, next);
  }else if(req.body.command == "delplan"){
    console.log('delplan');
    userDao.delplan(req, res, next);
  }else if(req.body.command == "addplan"){
    console.log('addplan');
    userDao.addplan(req, res, next);
  }else if(req.body.command == "queryplan"){
    console.log('queryplan');
    userDao.queryplan(req, res, next);
  }

});


module.exports = router;
