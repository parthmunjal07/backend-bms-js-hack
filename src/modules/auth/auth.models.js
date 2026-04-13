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

export async function createUsers(name, email, password) {
    const query = `
        INSERT INTO users (name, email, password_hash) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, email
    `;
    try {
        const res = await pool.query(query, [name, email, hashedPassword]);
        return res.rows[0]; 
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
}

export async function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    try {
        const res = await pool.query(query, [email]);
        return res.rows[0]; 
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err; 
    }
}

createUsersTable();

export default pool;