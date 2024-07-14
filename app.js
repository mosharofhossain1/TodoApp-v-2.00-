// 1. get input value from user
// 2. input value display ui
// 3. data store in localStorage 



// System Design Start steps
// Selecting Elements
const taskInput = document.querySelector('.inputArea input');
const addTaskBtn = document.querySelector('.inputArea button');
const taskTodoList = document.querySelector('#todoList');

// getInput Value function create 
function getInputValue(){
    const taskName = taskInput.value;
    // console.log(taskName)
    taskInput.value = '';
    return taskName;
}

// addBtn function create
function addBtnTask(){
    const taskName = getInputValue();
    if(!taskName)return;
        displayTaskToUi(taskName)
        addTaskToLocalStorage(taskName)
}
// enterHandler function create 
function enterHandler(e){
    if(e.key === 'Enter'){
        const taskName = getInputValue()
        if(!taskName)return
            displayTaskToUi(taskName)
            addTaskToLocalStorage(taskName)
    }
    
}

// display data in UI 
function displayTaskToUi(taskName){
    const li = document.createElement('li');
    li.innerHTML = `
            <span>${taskName}</span>
            <span>
                <button id="edit">E</button>
                <button id="delete">X</button>
            </span>`;
    taskTodoList.appendChild(li)
}

// localStorage Steps 

// add multiple task tolocalStorage
function addTasksToLocalStorage(tasks){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

// add a single task toLocalStorage
function addTaskToLocalStorage(taskName){
    const tasks = getTaskFromLocalStorage();
    tasks.push(taskName);
    addTasksToLocalStorage(tasks)
}

// get task from localStorage
function getTaskFromLocalStorage(){
    let tasks = [];
    const rowTask = localStorage.getItem('tasks');
    if(rowTask){
        tasks = JSON.parse(rowTask)
    }
    return tasks;
}



// AddEventListener function create
addTaskBtn.addEventListener('click', addBtnTask);
taskInput.addEventListener('keypress', enterHandler)