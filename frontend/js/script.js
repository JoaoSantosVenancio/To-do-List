const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.addForm')
const inputTask = document.querySelector('.input-task')

const fetchTask = async () => {
    const res = await fetch('http://localhost:3333/tasks')
    const tasks = await res.json()
    return tasks
}

const addTask = async (event)=>{
    event.preventDefault() //para nao regarregar auto

    const task = {title: inputTask.value}

    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })

    loadTasks()
    inputTask.value = ''
}

const deleteTask = async (id) =>{
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete'
    })

    loadTasks()
}

const updateTask = async ({id,title,status}) =>{
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({title,status})
    })

    loadTasks()
}

const formatDate = (dateUTC)=>{
    const options = {
        dateStyle: 'long',
        timeStyle: 'short'
    }

    const date = new Date(dateUTC).toLocaleString('pt-br',options)
    return date
}

const createElement = (tag, innerText = '', innerHTML = '') =>{
    const element = document.createElement(tag)

    if(innerText)
        element.innerText = innerText
    if(innerHTML)
        element.innerHTML = innerHTML
        
    return element
}

const createSelect = (valor) =>{
    const options = `
        <option value="Pendente">Pendente</option>
        <option value="Andamento">em andamento</option>
        <option value="Concluida">Concluida</option>
    `
    const select = createElement('select','',options)
    select.value = valor

    return select
}
const createRow = (task) =>{
    const {id,title,createdAt,status} = task 
    const tr = createElement('tr')
    const tdTitle = createElement('td', title)
    const tdDate = createElement('td',formatDate(createdAt))
    const tdStatus = createElement('td')
    const tdActions = createElement('td') 

    const editButton = createElement('button','','<span class="material-symbols-rounded">edit</span>')
    const deleteButton = createElement('buttun','','<span class="material-symbols-rounded">delete</span>')

    const editForm = createElement('form')
    const editInput = createElement('input')
    editInput.value = title 
    editForm.appendChild(editInput)
    editForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        
        updateTask({id,title:editInput.value,status})
    })

    const select = createSelect(status)
    select.addEventListener('change',({target}) =>updateTask({...task, status: target.value}))

    editButton.classList.add('btn-action')
    editButton.addEventListener('click', (event)=>{
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })
    deleteButton.classList.add('btn-action')
    deleteButton.addEventListener('click', () => deleteTask(id))

    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)
    tdStatus.appendChild(select)
    
    tr.appendChild(tdTitle)
    tr.appendChild(tdDate)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)
    
    return tr
}

const loadTasks = async () =>{
    const tasks = await fetchTask()
    tbody.innerHTML = ""

    tasks.forEach((task) => {
        const tr = createRow(task)
        tbody.appendChild(tr)
    });
}

addForm.addEventListener('submit',addTask)
loadTasks()