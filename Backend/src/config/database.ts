import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function initializeDatabase() {
    console.log("Connecting to DB")

    // Cria a tabela de clientes caso ainda não exista
    await pool.query(`
        CREATE TABLE IF NOT EXISTS clients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            phone VARCHAR(15),
            coordinateX NUMERIC NOT NULL,
            coordinateY NUMERIC NOT NULL
        )
    `)
}

pool.on("error", (err) => {
    console.error("Error connecting to DB", err)
})

export { pool, initializeDatabase }
