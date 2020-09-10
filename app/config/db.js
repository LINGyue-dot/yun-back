const mysql = require('mysql')
const date = require('./getDate')

var pool = mysql.createPool({
  host: '120.27.242.14',
  port: '3306',
  user: 'cat',
  password: '123456',
  database: 'blog'
});

let querys = function (sql) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, '', (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

function storedata (obj) {
  pool.getConnection(function (err, connection) {
    var addSql = 'INSERT INTO commentv2(name,text,email,winmac,chrome,url,date,indexs,deep,id,responseId) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    var addSqlParams = [obj.name, obj.text, obj.email, obj.winmac, obj.chrome, obj.url, obj.date, obj.indexs, obj.deep, obj.id, obj.responseId]
    console.log(obj);
    connection.query(addSql, addSqlParams, (err, result) => {

      if (err) {
        console.log('[stroe error] - ', err.message);
        connection.end();
        // querys(sql, callback);
        return -1;
      }
      console.log('插入成功');
      connection.release();
    });
  });
}


function addViewComment (addSql, addSqlParams) {
  pool.getConnection(function (err, connection) {

    connection.query(addSql, addSqlParams, (err, result) => {
      if (err) {
        console.log('[view error] - ', err.message);
        connection.end();
        // querys(sql, callback);
        return -1;
      }
      console.log('view++成功');
      connection.release();
    });
  });
}



module.exports = { querys, storedata, addViewComment }












// const connection = mysql.createConnection({
//     host: '120.27.242.14',
//     user: 'cat',
//     password: '123456',
//     database: 'blog',
//     useConnectionPooling: true
// })

// function connect () {
//     connection.connect((err) => {
//         if (err) return console.log('数据库连接失败', err.message)
//         console.log('数据库连接成功')
//     })
// }

// function selectAll (callback) {
//     //查询数据库中数据
//     var sql = 'SELECT * FROM article'
//     //查
//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log('[SELECT ERROR] - ', err.message)
//             connect();
//             selectAll();
//             return
//         }
//         callback(result)
//         console.log('查询成功');
//     })
// }


// function endConnection () {
//     connection.end();
// }


// module.exports = { connect, selectAll, endConnection }

