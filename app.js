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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./db");
var app = express();
var PORT = 3001;
app.use(express.json());
// GET all todos
app.get('/todos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, db_1.default)('todos').select('*')];
            case 1:
                todos = _a.sent();
                res.json(todos);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET a single todo by id
app.get('/todos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, todo, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).first()];
            case 2:
                todo = _a.sent();
                if (!todo) {
                    return [2 /*return*/, res.status(404).send('Todo not found')];
                }
                res.json(todo);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST a new todo
app.post('/todos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, task, completed, existingTodo, newTodo, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, task = _a.task, completed = _a.completed;
                console.log('Received request to create a new todo:', { id: id, task: task, completed: completed });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).first()];
            case 2:
                existingTodo = _b.sent();
                if (existingTodo) {
                    return [2 /*return*/, res.status(400).send('Todo with provided ID already exists')];
                }
                return [4 /*yield*/, (0, db_1.default)('todos').insert({ id: id, task: task, completed: completed })];
            case 3:
                _b.sent();
                console.log('Inserted todo ID:', id);
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).first()];
            case 4:
                newTodo = _b.sent();
                console.log('Newly created todo:', newTodo);
                res.status(201).json(newTodo);
                return [3 /*break*/, 6];
            case 5:
                err_3 = _b.sent();
                console.error('Error creating todo:', err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// PUT update an existing todo
app.put('/todos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, task, completed, updatedCount, updatedTodo, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, task = _a.task, completed = _a.completed;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).update({ task: task, completed: completed })];
            case 2:
                updatedCount = _b.sent();
                if (updatedCount === 0) {
                    return [2 /*return*/, res.status(404).send('Todo not found')];
                }
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).first()];
            case 3:
                updatedTodo = _b.sent();
                res.json(updatedTodo);
                return [3 /*break*/, 5];
            case 4:
                err_4 = _b.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// DELETE a todo
app.delete('/todos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedCount, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, db_1.default)('todos').where({ id: id }).del()];
            case 2:
                deletedCount = _a.sent();
                if (deletedCount === 0) {
                    return [2 /*return*/, res.status(404).send('Todo not found')];
                }
                res.status(204).send();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error(err_5);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
