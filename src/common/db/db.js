import pg from "pg";

const pool = new pg.Pool({
  host: "127.0.0.1",
  port: 5433,
  user: "parth",
  password: "postgres",
  database: "bms-backend",
  max: 20,
});

export default pool;