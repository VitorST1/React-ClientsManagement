import Client from "./Client"

export default function List() {
	const clients = [
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
	]

	return (
		<div className="overflow-auto p-8">
			<div className="grid grid-cols-5 items-center gap-4 rounded rounded-b-none border bg-slate-50 px-5 py-3 font-semibold text-slate-800">
				<div>Nome</div>
				<div>Email</div>
				<div>Telefone</div>
				<div>Coordenadas</div>
			</div>
			{clients.map((client) => (
				<Client
					key={client.id}
					name={client.name}
					email={client.email}
					phone={client.phone}
					coordinateX={client.coordinateX}
					coordinateY={client.coordinateY}
				/>
			))}
		</div>
	)
}
