const express = require('express')
// const mysql = require('./config/db')
const cors = require('cors')
const routes = require('./router/index') //自动引入indexjs
const bodyParser = require('body-parser')

const app = new express()

// var mysqld = new mysql();
// mysqld.connect();

app.use(cors())
app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
routes(app)

app.listen(3000, () => {
    console.log('serve has worked')
})