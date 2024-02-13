import { Pool, QueryConfig, QueryResult } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'Delhi@2001',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'todo'
});

interface QueryFunction {
  (text: string, params?: any[]): Promise<QueryResult>;
}

const query: QueryFunction = async (text: string, params?: any[]) => {
  return await pool.query(text, params);
};

export default { query };

