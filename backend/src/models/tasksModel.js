const connection = require('./connection')

const getAll = async () =>{
    const tasks = await connection.execute('SELECT * FROM tasks')
    return tasks[0]
}

const addTask = async (task) =>{
    const {title} = task
    const dateUTC = new Date(Date.now()).toUTCString()

    const query =  'INSERT INTO tasks(title, status, createdAt) VALUES (?,?,?)'
    const [createdTask] = await connection.execute(query,[title, 'Pendente', dateUTC])

    return {insertId: createdTask.insertId}
} 

module.exports = {
    getAll,
    addTask
}