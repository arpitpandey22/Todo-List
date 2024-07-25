let newTaskInput = document.getElementById('new-task');
let addTaskButton = document.getElementById('add-task');
let taskList = document.getElementById('task-list');

let tasks = [];

addTaskButton.addEventListener('click', addTask);

function addTask(event) {
    event.preventDefault();
    let newTask = newTaskInput.value.trim();
    if (newTask) {
        tasks.push({
            text: newTask,
            done: false
        });
        newTaskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        let taskHTML = `
            <li class="task ${task.done ? 'done' : ''}">
                <span>${task.text}</span>
                <button class="delete-task" data-index="${index}">X</button>
                <button class="toggle-done" data-index="${index}">${task.done ? 'Undo' : 'Done'}</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
    addEventListenersToTasks();
}

function addEventListenersToTasks() {
    let deleteTaskButtons = document.querySelectorAll('.delete-task');
    let toggleDoneButtons = document.querySelectorAll('.toggle-done');

    deleteTaskButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    });

    toggleDoneButtons.forEach(button => {
        button.addEventListener('click', toggleDone);
    });
}

function deleteTask(event) {
    let index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
}

function toggleDone(event) {
    let index = event.target.dataset.index;
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

renderTasks();