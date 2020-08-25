const express = require('express')
const connection = require('../config/db')
const router = express.Router()


//获取文章
router.get('/', (req, res) => {
  res.send('hello router')
})


// //  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = router