document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const container = document.querySelector(".container");

    // Load tasks from localStorage
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = ""; // Clear the task list
        savedTasks.forEach(function(taskData) {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${taskData.checked ? 'checked' : ''}>
                <span>${taskData.text}</span>
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
            savedTasks.push({ text: taskText, checked: false });
            saveTasksToLocalStorage();
            displayTasks();
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskToRemove = event.target.parentElement.querySelector("span").textContent;
            const taskIndex = savedTasks.findIndex(task => task.text === taskToRemove);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
                saveTasksToLocalStorage();
                displayTasks();
            }
        } else if (event.target.type === "checkbox") {
            const taskText = event.target.nextElementSibling.textContent;
            const taskIndex = savedTasks.findIndex(task => task.text === taskText);
            if (taskIndex !== -1) {
                savedTasks[taskIndex].checked = event.target.checked;
                saveTasksToLocalStorage();
            }
        }
    });
});
