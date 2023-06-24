const express = require('express')
const app = express()
const router = require('./router')
const PORT = process.env.PORT

app.use(router)
module.exports = app