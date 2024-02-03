// Contém todas as rotas relacionadas à cliente

import { Hono } from "hono"
import { pool} from "../../config/database"
import { Client } from "../../types/types"

const app = new Hono()

/*
    Rota para obtenção dos clientes.
    Oferece filtro por meio dos queryParams 'type' e 'search'.

    Exemplo de uso buscando todos os usuários onde o nome contenha a letra 'v':
    http://localhost:8080/clients?type=name&search=v
*/
app.get("/", async (c) => {
    try {
        const { type, search } = c.req.query()
        
        let where = ""
        if (type && search) {
            where += `WHERE ${type} ILIKE '%${search}%'`
        } else if (search) {
            where += `WHERE name ILIKE '%${search}%' OR email ILIKE '%${search}%' OR phone ILIKE '%${search}%'`
        }
        
        const clients = await pool.query(`SELECT * FROM clients ${where} ORDER BY id ASC`)
        return c.json(clients.rows)
    } catch(error) {
        return c.json({ error: "Erro ao buscar clientes" }, 500)
    }
})

/*
    Rota para criação de um novo cliente.
    Recebe os dados no corpo da requisição.
    Os campos 'name', 'coordinatex' e 'coordinatey' são obrigatórios.
*/
app.post("/", async (c) => {
    try {
        const body = await c.req.json()
        
        if (!body.name) 
        return c.json({ error: "Campo 'Nome' é obrigatório" }, 400)
        
        if (isNaN(body.coordinatex))
        return c.json({ error: "Campo 'Coordenada X' é obrigatório" }, 400)
        
        if (isNaN(body.coordinatey))
        return c.json({ error: "Campo 'Coordenada Y' é obrigatório" }, 400)
        
        pool.query(`INSERT INTO clients (name, email, phone, coordinatex, coordinatey) VALUES ('${body.name}', '${body.email}', '${body.phone}', ${body.coordinatex}, ${body.coordinatey})`)
        return c.json({ message: "Cliente criado com sucesso!" }, 201)
    } catch(error) {
        return c.json({ error: "Erro ao criar cliente" }, 500)
    }
})

/*
    Rota para atualização de um cliente.
    Recebe o ID do cliente na rota e os novos dados no corpo da requisição.
    Os campos 'name', 'coordinatex' e 'coordinatey' são obrigatórios.
*/
app.put("/:id", async (c) => {
    try {
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
    } catch(error) {
        return c.json({ error: "Erro ao atualizar cliente" }, 500)
    }
})

/*
    Rota para obténção de rota de visitação otimizada dos clientes.
    Calcula a rota de visitação e retorna os clientes ordenados de acordo com a ordem da rota.
*/
app.get("/visitationOrder", async (c) => {
    try {

        const result = await pool.query(`SELECT * FROM clients`)
        
        // Calcula a distância entre dois pontos
        const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
            const deltaX = x2 - x1
            const deltaY = y2 - y1
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        }
        
        // Calcula a rota de visitação, utiulizando a heurística de inserção mais próxima
        const calculateRoute = (clients: Client[]) => {
            const route: Client[] = []
            const visited: Set<number> = new Set()
            
            // Começa na empresa
            let currentX = 0
            let currentY = 0
            
            let nearestClient: Client | undefined
            let nearestDistance = Infinity
            
            // Obtém o vizinho mais próximo da empresa
            for (const client of clients) {
                const distance = calculateDistance(currentX, currentY, client.coordinatex, client.coordinatey)
                if (distance < nearestDistance) {
                    nearestClient = client
                    nearestDistance = distance
                }
            }
    
            // Adiciona o vizinho mais próximo na rota
            if (nearestClient) {
                route.push(nearestClient)
                visited.add(nearestClient.id)
            }
            
            // Visita os vizinhos restantes
            while (visited.size < clients.length) {
                // Variáveis auxiliares para a otimização
                let minIncrementalDistance = Infinity // Distância que será adicionada na rota
                let insertionIndex = -1 // Indice da inserção
                let insertedClient: Client | undefined // Cliente a ser inserido
                
                // Percorre cada cliente já inserido na rota
                for (let i = 0; i < route.length; i++) {
                    const currentClient = route[i]
                    const nextClient = route[i + 1]
                    
                    // Percorre os clientes que ainda não foram visitados, buscando a menor distância
                    for (const client of clients) {
                        if (!visited.has(client.id)) {
                            // Calcula a distância entre o cliente atual e o próximo
                            const distance = calculateDistance(currentClient.coordinatex, currentClient.coordinatey, client.coordinatex, client.coordinatey)
                            + calculateDistance(client.coordinatex, client.coordinatey, nextClient?.coordinatex || 0, nextClient?.coordinatey || 0)
                            - calculateDistance(currentClient.coordinatex, currentClient.coordinatey, nextClient?.coordinatex || 0, nextClient?.coordinatey || 0)
                            
                            // Verifica se a inserção do cliente atual reduz a distância a ser inserida na rota
                            if (distance < minIncrementalDistance) {
                                minIncrementalDistance = distance
                                insertionIndex = i + 1
                                insertedClient = client
                            }
                        }
                    }
                }
                
                // Insere o cliente com a menor distância na rota
                if (insertionIndex !== -1 && insertedClient) {
                    route.splice(insertionIndex, 0, insertedClient)
                    visited.add(insertedClient.id)
                }
            }
            
            return route
        }
        
        const route = calculateRoute(result.rows)
        return c.json(route)
    } catch (error) {
        return c.json({ error: "Erro ao obter rota de visitação" }, 500)
    }
})

export default app