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

function createUsersTable() {
    const query = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    pool.query(query, (err, res) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Users table created or already exists.");
        }
    })
}

export default pool;