const express = require('express')
const mysql = require('./config/db')
const routes = require('./router')//自动引入indexjs
const bodyParser = require('body-parser')
const app = new express()


mysql(app)

routes(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log("serve has worked")
})

