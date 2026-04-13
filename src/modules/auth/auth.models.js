import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5433,
  user: "parth",
  password: "postgres",
  database: "bms-backend",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});