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
module.exports = Dates