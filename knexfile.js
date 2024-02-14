"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'Delhi@2001',
            database: 'todo'
        }
    }
};
exports.default = knexConfig;
