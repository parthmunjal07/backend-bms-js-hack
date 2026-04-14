import pg from "pg";

const pool = new pg.Pool({
  host: "127.0.0.1",
  port: 5435,
  user: "parth",
  password: "postgres",
  database: "postgress-seats",
  max: 20,
});

export default pool;