const mysql = require('mysql')


var connection = mysql.createConnection({
  host: '120.27.242.14',
  user: 'cat',
  password: '123456',
  database: 'news'
});

module.exports = app => {
  connection.connect((err) => {
    if (err) return console.log('数据库连接失败', err.message);
    console.log('数据库连接成功');
  });
}
//  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
