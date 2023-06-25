const tasksModel = require('../models/tasksModel')

const getAll = async (_req,res) => { //o underline no req mostra que a var nao esta sendo usado, boas praticas
    const tasks = await tasksModel.getAll() 
    return res.status(200).json(tasks)
}
const addTask = async (req,res) => {
    const createdTask = await tasksModel.addTask(req.body)
    
    return res.status(201).json(createdTask)
}
module.exports ={
    getAll,
    addTask
}