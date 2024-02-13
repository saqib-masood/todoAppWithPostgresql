"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// GET all todos
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM todos');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
// GET a single todo by id
app.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query('SELECT * FROM todos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Todo not found');
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
// POST a new todo
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, task, completed } = req.body;
        if (!id || !task || completed === undefined) {
            return res.status(400).send('Invalid request body');
        }
        const result = yield db_1.default.query('INSERT INTO todos (id, task, completed) VALUES ($1, $2, $3) RETURNING *', [id, task, completed]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
// PUT update an existing todo
app.put('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        if (!task || completed === undefined) {
            return res.status(400).send('Invalid request body');
        }
        const result = yield db_1.default.query('UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *', [task, completed, id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Todo not found');
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
// DELETE a todo
app.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('DELETE FROM todos WHERE id = $1', [id]);
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// "scripts":
// "start": "node index.js",
// "build": "tsc -p tsconfig.json"
// "test": "mocha tests/**/*.spec.js"
// },  
