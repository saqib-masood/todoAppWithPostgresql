"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var knexfile_1 = require("./knexfile");
var db = (0, knex_1.default)(knexfile_1.default.development);
exports.default = db;
