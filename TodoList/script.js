document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const container = document.querySelector(".container");

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = ""; // Clear the task list
        savedTasks.forEach(function(taskText) {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Display saved tasks on page load
    displayTasks();

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            savedTasks.push(taskText);
            saveTasksToLocalStorage();
            displayTasks();
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskToRemove = event.target.parentElement.querySelector("span").textContent;
            const taskIndex = savedTasks.indexOf(taskToRemove);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
                saveTasksToLocalStorage();
                displayTasks();
            }
        }
    });
});
