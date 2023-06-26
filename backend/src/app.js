const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(router)

module.exports = app