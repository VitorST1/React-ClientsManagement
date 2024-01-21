import { Icon } from "@iconify/react/dist/iconify.js"
import { Client } from "../../types/types"

export default function ClientInfo(props: { client: Client }) {
	const client = props.client

	return (
		<div className="grid grid-cols-5 items-center gap-4 border border-t-0 p-5 text-slate-800 last:rounded-b  hover:bg-slate-50/50">
			<div className="line-clamp-1">{client.name}</div>
			<div className="line-clamp-1">{client.email}</div>
			<div className="line-clamp-1">{client.phone}</div>
			<div className="line-clamp-1">
				({client.coordinateX},{client.coordinateY})
			</div>
			<div className="justify-self-end rounded">
				<div className="relative">
					<button className="group relative rounded bg-indigo-500 p-2 hover:bg-indigo-600">
						<Icon className="text-2xl text-slate-50" icon="mdi:pencil-box-outline" />
						<div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm text-white opacity-0 group-hover:opacity-100">
							Editar
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}
