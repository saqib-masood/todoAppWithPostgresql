import express, { Request, Response } from 'express';
import db from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

// GET all todos
app.get('/todos', async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a single todo by id
app.get('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Todo not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST a new todo
app.post('/todos', async (req: Request, res: Response) => {
  try {
    const { id, task, completed } = req.body;
    if (!id || !task || completed === undefined) {
      return res.status(400).send('Invalid request body');
    }
    const result = await db.query('INSERT INTO todos (id, task, completed) VALUES ($1, $2, $3) RETURNING *', [id, task, completed]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// PUT update an existing todo
app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    if (!task || completed === undefined) {
      return res.status(400).send('Invalid request body');
    }
    const result = await db.query('UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *', [task, completed, id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Todo not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "scripts":
// "start": "node index.js",
// "build": "tsc -p tsconfig.json"
// "test": "mocha tests/**/*.spec.js"
// },  