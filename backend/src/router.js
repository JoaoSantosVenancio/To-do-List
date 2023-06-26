const express = require('express')
const tasksController = require('./controllers/tasksController')
const router = express.Router()
const middleTasks = require('./middlewares/tasksMiddlewares')

router.get('/tasks',tasksController.getAll)
router.post('/tasks', middleTasks.validateTitleField, tasksController.addTask)
router.delete('/tasks/:id', tasksController.deleteTask)
router.put('/tasks/:id',
 middleTasks.validateStatusFIeld,
 middleTasks.validateTitleField, 
 tasksController.updateTask
 )

module.exports = router