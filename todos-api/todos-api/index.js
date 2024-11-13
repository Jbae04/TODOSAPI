const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data with priority field added
let todos = [
  { id: 1, task: "Learn Node.js", completed: false, priority: "medium" },
  { id: 2, task: "Build a REST API", completed: false, priority: "high" }
];

// GET /todos - Retrieve all to-do items with optional completion status filter
app.get('/todos', (req, res) => {
  const { completed } = req.query;
  
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    const filteredTodos = todos.filter(todo => todo.completed === isCompleted);
    return res.json(filteredTodos);
  }
  
  res.json(todos);
});

// POST /todos - Add a new to-do item with priority
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
    priority: req.body.priority || "medium"
  };
  
  const validPriorities = ["high", "medium", "low"];
  if (!validPriorities.includes(newTodo.priority.toLowerCase())) {
    return res.status(400).json({ error: "Priority must be 'high', 'medium', or 'low'" });
  }
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// IMPORTANT: Complete-all route MUST come BEFORE the /:id route
app.put('/todos/complete-all', (req, res) => {
  if (todos.length === 0) {
    return res.status(200).json({ message: "No todos to complete", todos: [] });
  }
  
  todos = todos.map(todo => ({
    ...todo,
    completed: true
  }));
  
  res.json({ 
    message: "All todos marked as completed", 
    todos: todos 
  });
});

// PUT /todos/:id - Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).send("To-Do item not found");
  }
  
  todo.task = req.body.task || todo.task;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.priority = req.body.priority || todo.priority;
  
  if (req.body.priority) {
    const validPriorities = ["high", "medium", "low"];
    if (!validPriorities.includes(todo.priority.toLowerCase())) {
      return res.status(400).json({ error: "Priority must be 'high', 'medium', or 'low'" });
    }
  }
  
  res.json(todo);
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).send("To-Do item not found");
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});