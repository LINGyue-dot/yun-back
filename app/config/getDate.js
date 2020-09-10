// 获取时间
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth() + 1
var day = date.getDate()
if (month < 10) {
    month = '0' + month
}
if (day < 10) {
    day = '0' + day
}
var Dates = year + '-' + month + '-' + day

// 获取6位随机数 第一位不为0
var num = '';
var f = Math.floor(Math.random() * 10);
while (f === 0) {
    f = Math.floor(Math.random() * 10);
}
num = num + f;
for (var i = 0; i < 7; i++) {
    var s = Math.floor(Math.random() * 10);
    num = num + s;
}



module.exports = { Dates, num }