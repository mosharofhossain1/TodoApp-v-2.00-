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
                <span id='taskName'>${taskName}</span>
                <button id="edit">E</button>
                <button id="delete">X</button> `;
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

// Display All task to ui while page load
function loadAllTaskFromUi(){
    const tasks = getTaskFromLocalStorage();
    tasks.forEach((taskName => displayTaskToUi(taskName)))
}

loadAllTaskFromUi();

// delete data steps
function deleteTaskFromLocalStorage(taskName){
    const tasks = getTaskFromLocalStorage();
    const taskAfterDeleting = tasks.filter((task)=> task !== taskName)
    addTasksToLocalStorage(taskAfterDeleting)
}

function deleteHandler(targetEl){
      const li = targetEl.parentElement;
      const taskName = li.querySelector('#taskName').textContent;
      li.remove();
      deleteTaskFromLocalStorage(taskName)
}

function actionHandler(e){
    const targetEl = e.target;
   if(targetEl.id === 'delete'){
    deleteHandler(targetEl);
   }

}


// AddEventListener function create
addTaskBtn.addEventListener('click', addBtnTask);
taskInput.addEventListener('keypress', enterHandler);
taskTodoList.addEventListener('click', actionHandler);