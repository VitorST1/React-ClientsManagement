import { useState } from "react"
import { Client } from "../../types/types"
import ClientInfo from "./ClientInfo"

export default function List() {
	const [clients, setClients] = useState<Client[]>([
		{
			id: 1,
			name: "Vitor",
			email: "vitor@email.com",
			phone: "553299999999",
			coordinateX: 0,
			coordinateY: 1,
		},
		{
			id: 2,
			name: "Nome",
			email: "Email",
			phone: "Telefone",
			coordinateX: 0,
			coordinateY: 2,
		},
	])

	const handleClientChange = (newClient: Client) => {
		const index = clients.findIndex((client) => client.id === newClient.id)
		if (index !== -1) {
			setClients((prevClients) => [
				...prevClients.slice(0, index),
				newClient,
				...prevClients.slice(index + 1),
			])
		}
	}

	if (!clients.length)
		return (
			<div className="m-8 rounded-md border p-8 text-center text-slate-500">
				Nenhum cliente encontrado!
			</div>
		)

	return (
		<div className="overflow-auto p-8">
			<div className="grid grid-cols-5 items-center gap-4 rounded-md rounded-b-none border bg-slate-50 px-5 py-3 font-semibold text-slate-800">
				<div>Nome</div>
				<div>Email</div>
				<div>Telefone</div>
				<div>Coordenadas</div>
				<div className="justify-self-end">Editar</div>
			</div>
			{clients.map((client) => (
				<ClientInfo key={client.id} client={client} onClientChange={handleClientChange} />
			))}
		</div>
	)
}
