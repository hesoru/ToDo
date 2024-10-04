const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware
const app = express(); // Initialize the Express app
const port = 3000; // Define the port where the server will listen

// Use CORS to allow requests from the frontend
app.use(cors());
// Use express.json() to parse incoming JSON requests
app.use(express.json());

let tasks = []; // In-memory array to store tasks
let taskId = 0;

// GET route to send the list of tasks to the frontend
app.get("/tasks", (request, response) => {
    response.json(tasks); // Send the tasks array as a JSON response
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`Server running on <http://localhost>:${port}`);
});

app.post("/tasks", (request, response) => {
    const newTask = {
        id: taskId++,
        task: request.body.task
    };
    tasks.push(newTask);
    response.json(newTask);
});

app.delete("/tasks/:id", (request, response) => {
    const taskId = parseInt(request.params.id); // convert id to integer
    tasks = tasks.filter((task) => task.id !== taskId); // filter out task
    response.sendStatus(200); // OK status
});

// node server.js
// go to browser and open localhost:3000/tasks

// node server.js
