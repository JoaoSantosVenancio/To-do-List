const express = require('express')
const tasksController = require('./controllers/tasksController')
const router = express.Router()

module.exports = router


router.get('/tasks',tasksController.getAll)


