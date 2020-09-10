const express = require('express')
const connection = require('../config/db')
const router = express.Router()
const { Dates, num } = require('../config/getDate')
const { querys, storedata, addViewComment } = require('../config/db')

//全部获取文章
router.get('/', async function (req, res) {

    // 数据库
    // 获取全部文章
    var sql = 'SELECT * FROM article'
    let article = await querys(sql);
    res.send(article)
    console.log(Dates);
    console.log(num);
})

//全部获取文章
router.get('/categories', async function (req, res) {

    // 获取全部文章
    var sql = 'SELECT * FROM article'
    var article = await querys(sql);
    // article.forEach((element, index) => {
    //     element.index = index
    // });
    res.send(article)
})
//全部获取文章
router.get('/time', async function (req, res) {
    // 获取全部文章
    var sql = 'SELECT * FROM article'
    var article = await querys(sql, getArticle);
    res.send(article)
    // endConnection()
})

// 获取指定文章
router.get('/article', async function (req, res) {
    // 数据库
    // selectAll(getArticle)
    var object = {}
    var sql = 'SELECT * FROM article'
    var a = await querys(sql)
    object.article = a[req.query.index]
    if (req.query.text) {
        var obj = {}
        obj.indexs = req.query.indexs;
        obj.text = req.query.text;
        obj.name = req.query.name;
        obj.email = req.query.email;
        obj.winmac = 1;
        obj.chrome = 1;
        obj.date = Dates;
        obj.url = 'www.yundingzhishang.xyz';
        // deep
        obj.deep = parseInt(req.query.deep);
        obj.responseId = req.query.responseId;
        obj.id = num;
        console.log(num)
        storedata(obj);
        // comment++ 
        var addCommentsql = 'UPDATE article SET commit= ? WHERE indexs = ?'
        var addCommentParams = [++a[req.query.indexs].commit, req.query.indexs]
        addViewComment(addCommentsql, addCommentParams);
    }
    if (req.query.index) {
        // view++
        var addViewsql = 'UPDATE article SET view = ? WHERE indexs = ?'
        var addViewParams = [++a[req.query.index].view, req.query.index]
        //
        addViewComment(addViewsql, addViewParams)
    }
    var sqls = 'SELECT * FROM commentv2';
    object.comment = await querys(sqls);
    res.send(object);
})
// 搜素
//全部获取文章
router.get('/search', async function (req, res) {
    // 获取全部文章
    var sql = 'SELECT * FROM article'
    var article = await querys(sql);
    res.send(article);
})
router.post('/', async function (req, res) {
    res.send(req.query.name)
})
module.exports = router