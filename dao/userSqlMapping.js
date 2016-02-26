var user = {
  insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  update:'update user set name=?, age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user',
  queryAllGroup: 'select * from emergency_plangroup'
};

module.exports = user;
