const express = require('express')

const connection = require('../config/db')
const router = express.Router()
const date = require('../config/getDate')

// const { connect, selectAll } = require('../config/db')

// const mysql = require('../config/db')

const { querys, storedata, addViewComment } = require('../config/db')

//全部获取文章
router.get('/', (req, res) => {

    // 数据库
    // 获取全部文章
    // connect()
    // selectAll(getArticle)
    var sql = 'SELECT * FROM article'
    querys(sql, getArticle)

    function getArticle (a) {
        var article = a
        res.send(article)
        // endConnection()
    }
})

//全部获取文章
router.get('/categories', (req, res) => {

    // 获取全部文章
    var sql = 'SELECT * FROM article'
    querys(sql, getArticle)

    function getArticle (a) {
        var article = a
        article.forEach((element, index) => {
            element.index = index
        });
        res.send(article)
        // endConnection()
    }
})


//全部获取文章
router.get('/time', (req, res) => {

    // 获取全部文章
    var sql = 'SELECT * FROM article'
    querys(sql, getArticle)

    function getArticle (a) {
        var article = a
        article.forEach((element, index) => {
            element.index = index
        });
        res.send(article)
        // endConnection()
    }
})

// 获取指定文章
router.get('/article', async function (req, res) {
    // 数据库
    // selectAll(getArticle)
    var object = {}
    var sql = 'SELECT * FROM article'

    await querys(sql, getArticle)
    function getArticle (a) {
        // res.send(a.reverse()[req.query.index])
        object.article = a[req.query.index]
        if (req.query.text) {
            var obj = {}
            obj.indexs = req.query.indexs;
            obj.text = req.query.text;
            obj.name = req.query.name;
            obj.email = req.query.email;
            obj.winmac = 1;
            obj.chrome = 1;
            obj.date = date;
            obj.url = 'www.yundingzhishang.xyz';
            storedata(obj);
            // comment++ 
            var addCommentsql = 'UPDATE article SET commit= ? WHERE indexs = ?'
            var addCommentParams = [++a[req.query.indexs].commit, req.query.indexs]
            addViewComment(addCommentsql, addCommentParams);
        }
        if (req.query.index) {
            // view++
            var addViewsql = 'UPDATE article SET view = ? WHERE indexs = ?'
            // console.log(a.reverse());
            var addViewParams = [++a[req.query.index].view, req.query.index]
            //
            addViewComment(addViewsql, addViewParams)
        }
    }
    var sqls = 'SELECT * FROM commentv2';
    await querys(sqls, getComment);
    function getComment (a) {
        object.comment = a
        // res.send(a)
    }
    setTimeout(() => {
        res.send(object);

    }, 1000)
    // console.log(await object)
})


// 搜素
//全部获取文章
router.get('/search', (req, res) => {

    // 获取全部文章
    var sql = 'SELECT * FROM article'
    querys(sql, getArticle)

    function getArticle (a) {
        var article = a.reverse()
        article.forEach((element, index) => {
            element.index = index
        });
        res.send(article)
        // endConnection()
    }
})


router.post('/', async (req, res) => {
    /*
           ????? req.body 无法获取 post请求的数据而 query 却可以获取 
           */
    res.send(req.query.name)
})


module.exports = router