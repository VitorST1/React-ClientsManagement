import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function initializeDatabase() {
    console.log("Connecting to DB")

    // Cria a tabela de clientes caso ainda não exista
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100),
                phone VARCHAR(15),
                coordinatex NUMERIC NOT NULL,
                coordinatey NUMERIC NOT NULL
            )
        `)

        // Cria os indexes dos campos name, email e phone caso ainda não existam
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_clients_name ON clients (name);
        `)
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_clients_email ON clients (email);
        `)
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients (phone);
        `)
    } catch (error) {
        console.error(error)
    }
}

pool.on("connect", () => {
    console.log("Connected to DB")
})

pool.on("error", (err) => {
    console.error("Error connecting to DB", err)
})

export { pool, initializeDatabase }
