import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false },
});

export default pool;
