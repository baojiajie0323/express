var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

var dbcode = {
  SUCCESS: 0,
  CONNECT_ERROR:1,
  PARAM_ERROR:2,
  FAIL:3
}
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret ,code) {
  if(code != dbcode.SUCCESS){
    if(code == dbcode.CONNECT_ERROR){ res.json({code:code,msg:'数据库连接失败'}); }
    else if(code == dbcode.PARAM_ERROR){ res.json({code:code,msg:'参数错误'}); }
    else if(code == dbcode.FAIL){ res.json({code:code,msg:'操作失败'}); }
  }else {
    if(typeof ret === 'undefined'){
      res.json({code:dbcode.FAIL,msg:'操作失败'});
    }else{
      res.json({code:0,data:ret});
    }
  }
};

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      connection.query($sql.insert, [param.name, param.age], function(err, result) {
        if(result) {
          result = {
            code: 200,
            msg:'增加成功'
          };
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);

        // 释放连接
        connection.release();
      });
    });
  },
  delete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function(err, connection) {
      var id = +req.query.id;
      connection.query($sql.delete, id, function(err, result) {
        if(result.affectedRows > 0) {
          result = {
            code: 200,
            msg:'删除成功'
          };
        } else {
          result = void 0;
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  update: function (req, res, next) {
    // update by id
    // 为了简单，要求同时传name和age两个参数
    var param = req.body;
    if(param.name == null || param.age == null || param.id == null) {
      jsonWrite(res, undefined);
      return;
    }

    pool.getConnection(function(err, connection) {
      connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
        // 使用页面进行跳转提示
        if(result.affectedRows > 0) {
          res.render('suc', {
            result: result
          }); // 第二个参数可以直接在jade中使用
        } else {
          res.render('fail',  {
            result: result
          });
        }

        connection.release();
      });
    });

  },
  queryById: function (req, res, next) {
    var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryById, id, function(err, result) {
        jsonWrite(res, result);
        connection.release();

      });
    });
  },
  queryAll: function (req, res, next) {
    console.log('queryAll');
    pool.getConnection(function(err, connection) {
      if(connection == undefined){
        jsonWrite(res, undefined);
        return;
      }else{
        connection.query($sql.queryAll, function(err, result) {
          console.log(err)
          jsonWrite(res, result);
          connection.release();
        });
      }
    });
  },

  insertgroup: function (req, res, next) {
    var param = req.body;
    if(param.name == null || param.groupid == null) {
      jsonWrite(res, {}, dbcode.PARAM_ERROR);
      return;
    }

    pool.getConnection(function(err, connection) {
      if(connection == undefined){
        jsonWrite(res, {} ,dbcode.CONNECT_ERROR);
        return;
      }else{
        connection.query($sql.insertgroup, [param.name, param.groupid], function(err, result) {
          if(result.affectedRows > 0) {
            jsonWrite(res,result,dbcode.SUCCESS);
          } else {
            jsonWrite(res, {},dbcode.FAIL);
          }
          connection.release();
        });
      }
    });
  },

  queryallgroup: function (req, res, next) {
    console.log('queryallgroup');
    pool.getConnection(function(err, connection) {
      if(connection == undefined){
        jsonWrite(res,{},dbcode.CONNECT_ERROR);
        return;
      }else{
        connection.query($sql.queryallgroup, function(err, result) {
          jsonWrite(res, result,dbcode.SUCCESS);
          connection.release();
        });
      }
    });
  },

  queryallplan: function (req, res, next) {
    console.log('queryallplan');
    pool.getConnection(function(err, connection) {
      if(connection == undefined){
        jsonWrite(res,{},dbcode.CONNECT_ERROR);
        return;
      }else{
        connection.query($sql.queryallplan, function(err, result) {
          jsonWrite(res, result,dbcode.SUCCESS);
          connection.release();
        });
      }
    });
  },

};
