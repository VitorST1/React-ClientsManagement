import { Client } from "../../types/types"
import ClientInfo from "./ClientInfo"

// Lista de clientes.
export default function List(props: { clients: Client[]; onEdit?: () => void }) {
	const clients = props.clients

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
			{clients.map((client: Client) => (
				<ClientInfo key={client.id} client={client} onEdit={props.onEdit} />
			))}
		</div>
	)
}
