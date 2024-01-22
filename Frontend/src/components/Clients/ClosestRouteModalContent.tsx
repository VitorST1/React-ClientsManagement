import { Client } from "../../types/types"
import ClientInfo from "./ClientInfo"

export default function ClosestRouteModalContent(props: {
	clients: Client[]
	error: Error | null
	isLoading: boolean
}) {
	const clients = props.clients

	if (props.isLoading) return <div className="p-8 text-center text-slate-500">Carregando...</div>

	if (props.error) return <div className="p-8 text-center text-slate-500">Algo deu errado!</div>

	if (!clients.length)
		return <div className="p-8 text-center text-slate-500">Nenhum cliente encontrado!</div>

	return (
		<>
			<div className="grid grid-cols-4 items-center gap-4 rounded-md rounded-b-none border bg-slate-50 px-5 py-3 font-semibold text-slate-800">
				<div>Nome</div>
				<div>Email</div>
				<div>Telefone</div>
				<div>Coordenadas</div>
			</div>
			{clients.map((client: Client) => (
				<ClientInfo key={client.id} client={client} hideEditButton={true} />
			))}
		</>
	)
}
