const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(express.json());

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await db('todos').select('*');
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a single todo by id
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db('todos').where({ id }).first();
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// POST a new todo
app.post('/todos', async (req, res) => {
  const {id, task, completed } = req.body;
  console.log('Received request to create a new todo:', {id, task, completed });

  try {
    const existingTodo = await db('todos').where({ id }).first();
    if (existingTodo) {
      return res.status(400).send('Todo with provided ID already exists');
    }
    await db('todos').insert({id, task, completed });
    console.log('Inserted todo ID:', id);

    const newTodo = await db('todos').where({ id }).first();
    console.log('Newly created todo:', newTodo);

    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).send('Internal Server Error');
  }
});


// PUT update an existing todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  try {
    const updatedCount = await db('todos').where({ id }).update({ task, completed });
    if (updatedCount === 0) {
      return res.status(404).send('Todo not found');
    }
    const updatedTodo = await db('todos').where({ id }).first();
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await db('todos').where({ id }).del();
    if (deletedCount === 0) {
      return res.status(404).send('Todo not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app; 