// script.js
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    if (isCompleted) li.classList.add("completed");

    // Task text in a span
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Complete button (check icon)
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function() {
        li.classList.toggle("completed");
        updateLocalStorage();
    };
    li.appendChild(completeBtn);

    // Edit button (pencil icon)
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function() {
        const newText = prompt("Edit your task:", taskSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskSpan.textContent = newText.trim();
            updateLocalStorage();
        }
    };
    li.appendChild(editBtn);

    // Delete button (trash icon)
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        li.remove();
        updateLocalStorage();
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save a new task to local storage
function saveTask(taskText) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Get tasks from local storage
function getTasksFromStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Update local storage when tasks change
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}