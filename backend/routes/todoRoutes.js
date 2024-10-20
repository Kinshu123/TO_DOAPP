const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log('Fetched todos:', todos);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  console.log('Received todo data:', req.body);
  const todo = new Todo({
    todo: req.body.todo,
  });

  try {
    const newTodo = await todo.save();
    console.log('Saved new todo:', newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error saving todo:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  console.log('Updating todo:', req.params.id, req.body);
  try {
    const todo = await Todo.findById(req.params.id);
    if (req.body.todo) {
      todo.todo = req.body.todo;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }
    const updatedTodo = await todo.save();
    console.log('Updated todo:', updatedTodo);
    res.json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  console.log('Deleting todo:', req.params.id);
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    console.log('Delete result:', result);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;