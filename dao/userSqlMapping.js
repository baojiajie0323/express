var user = {
  insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  update:'update user set name=?, age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user',
  insertgroup: 'insert into emergency_plan_group(name,groupid) values(?,?)',
  updategroup: 'update emergency_plan_group set name=? where id = ?',
  deletegroup: 'delete from emergency_plan_group where id = ?',
  queryallgroup: 'select * from emergency_plan_group',
  insertplan: 'insert into emergency_plan(name,createtime,createuser,detail,groupid) values(?,?,?,?,?)',
  updateplan: 'update emergency_plan set name=?,detail=? where id = ?',
  deleteplan: 'delete from emergency_plan where id = ?',
  queryallplan: 'select * from emergency_plan',
};

module.exports = user;
