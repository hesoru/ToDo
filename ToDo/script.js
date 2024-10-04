function handleTaskSubmission(event) {
  event.preventDefault(); // Prevent the form from refreshing

  // Get the task input value
  let taskInputValue = document.getElementById("taskInput").value;

  if (taskInputValue.length > 20) {
    alert("Task is too long. Please limit it to 20 characters.");
  } else {
    // If valid, log the task to the console
    // console.log("Task entered:", taskInputValue);
    addTaskToBackend(taskInputValue);
  
    // Clear the input field after submission
    document.getElementById("taskInput").value = "";
  }
}

function addTaskToBackend(task) {
  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({ task })
  })
  .then((response) => response.json())
  .then((newTask) => {
    addTaskToList(newTask);
  })
  .catch((error) => console.error("Error adding task", error));
}

function addTaskToList(task) {
  let taskList = document.getElementById("taskList");
  let newTask = document.createElement("li");

  newTask.textContent = task.task;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function() {
    deleteTaskFromBackend(task.id, newTask);
  });

  newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
}

function deleteTaskFromBackend(taskID, taskElement) {
  fetch(`http://localhost:3000/tasks/${taskID}`, {
    method: "DELETE"
  })
  .then(() => {
    taskElement.remove();
  })
  .catch((error) => console.error("Error deleting task", error));
}

// Step 2: Attach the event listener to the form
document
  .getElementById("taskForm")
  .addEventListener("submit", handleTaskSubmission);

window.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {
    fetch("http://localhost:3000/tasks") // Send a GET request to the server
    .then((response) => response.json()) // Convert the response to JSON
    .then((tasks) => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear the existing list
        tasks.forEach((task) => {
            const newTask = document.createElement("li");
            newTask.textContent = task.task; // Add task to the list

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
              deleteTaskFromBackend(task.id, newTask);
            });
          
            newTask.appendChild(deleteButton);
            taskList.appendChild(newTask);
          
        });
    })
    .catch((error) => console.error("Error fetching tasks:",
    error));
}