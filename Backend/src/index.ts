import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import 'dotenv/config'
import { initializeDatabase } from "./config/database"
import clients from "./api/routes/clients"

const app = new Hono()
const port = process.env.PORT

app.use('*', cors())

app.options('*', (c) => {
  return c.text('', 204);
})

app.get("/", (c) => c.text("Hello from hono!"))
app.get("/health", (c) => c.text("Alive"))
app.notFound((c) => c.json({ error: "Not Found" }, 404))

console.log(`Server is running on port ${port}`)

app.route('/clients', clients)

// Inicia o servidor
serve({
  fetch: app.fetch,
  port: Number(port)
})

// Inicia a conexão com o banco de dados.
initializeDatabase()

