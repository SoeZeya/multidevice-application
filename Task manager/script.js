// Wait for DOM to be fully loaded before executing script
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    // Add event listener for Enter key in task input
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});

// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    // Validate that task text is not empty
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    // Get current tasks, add new one, and save
    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    renderTasks();
    // Clear input and refocus for new tasks
    taskInput.value = "";
    taskInput.focus();
}

// Function to display all tasks in the UI
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const emptyMessage = document.getElementById("emptyMessage");
    const tasks = getTasks();

    taskList.innerHTML = ""; // Clear current list

    // Show empty message if no tasks exist
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    // Create DOM elements for each task
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        
        // Create checkbox for task completion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));
        
        // Create span for task text
        const span = document.createElement("span");
        span.className = "task-text" + (task.completed ? " completed" : "");
        span.textContent = task.text;
        
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => removeTask(index));
        
        // Append all elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Toggle task completion status
function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

// Remove task from list after confirmation
function removeTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    }
}

// Retrieve tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial load of tasks when page loads
function loadTasks() {
    renderTasks();
}