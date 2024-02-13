"use strict";
// // const { Pool } = require('pg');
// import { Pool } from 'pg';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = new Pool({
//   user: 'postgres',
//   password: 'Delhi@2001',
//   host: 'localhost',
//   port: 5432, // default Postgres port
//   database: 'todo'
// });
// // @ts-ignore
// export const query = (text:string, params) => pool.query(text, params);
// export default { query };
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    password: 'Delhi@2001',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'todo'
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pool.query(text, params);
});
exports.default = { query };
