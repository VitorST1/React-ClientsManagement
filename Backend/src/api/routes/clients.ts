// Contém todas as rotas relacionadas à cliente

import { Hono } from "hono"
import { pool} from "../../config/database"

const app = new Hono()

/*
    Rota para obtenção dos clientes.
    Oferece filtro por meio dos queryParams 'type' e 'search'.

    Exemplo de uso buscando todos os usuários onde o nome contenha a letra 'v':
    http://localhost:8080/clients?type=name&search=v
*/
app.get("/", async (c) => {
    const { type, search } = c.req.query()

    let where = ""
    if (type && search) {
        where += `WHERE ${type} ILIKE '%${search}%'`
    } else if (search) {
        where += `WHERE name ILIKE '%${search}%' OR email ILIKE '%${search}%' OR phone ILIKE '%${search}%'`
    }

    const clients = await pool.query(`SELECT * FROM clients ${where} ORDER BY id ASC`)
    return c.json(clients.rows)
})

/*
    Rota para criação de um novo cliente.
    Recebe os dados no corpo da requisição.
    Os campos 'name', 'coordinatex' e 'coordinatey' são obrigatórios.
*/
app.post("/", async (c) => {
    const body = await c.req.json()

    if (!body.name) 
        return c.json({ error: "Campo 'Nome' é obrigatório" }, 400)

    if (isNaN(body.coordinatex))
        return c.json({ error: "Campo 'Coordenada X' é obrigatório" }, 400)

    if (isNaN(body.coordinatey))
        return c.json({ error: "Campo 'Coordenada Y' é obrigatório" }, 400)

    pool.query(`INSERT INTO clients (name, email, phone, coordinatex, coordinatey) VALUES ('${body.name}', '${body.email}', '${body.phone}', ${body.coordinatex}, ${body.coordinatey})`)
    return c.json({ message: "Cliente criado com sucesso!" }, 201)
})

/*
    Rota para atualização de um cliente.
    Recebe o ID do cliente na rota e os novos dados no corpo da requisição.
    Os campos 'name', 'coordinatex' e 'coordinatey' são obrigatórios.
*/
app.put("/:id", async (c) => {
    const body = await c.req.json()
    const { id } = c.req.param()

    if (!body.name) 
        return c.json({ error: "Campo 'Nome' é obrigatório" }, 400)

    if (isNaN(body.coordinatex))
        return c.json({ error: "Campo 'Coordenada X' é obrigatório" }, 400)

    if (isNaN(body.coordinatey))
        return c.json({ error: "Campo 'Coordenada Y' é obrigatório" }, 400)

    pool.query(`UPDATE clients SET name = '${body.name}', email = '${body.email}', phone = '${body.phone}', coordinatex = ${body.coordinatex}, coordinatey = ${body.coordinatey} WHERE id = ${id}`)
    return c.json({ message: "Cliente atualizado com sucesso!" }, 200)
})

export default app