import { Icon } from "@iconify/react/dist/iconify.js"

export default function Client(props: {
	name: string
	email: string
	phone: string
	coordinates: number
}) {
	return (
		<div className="grid grid-cols-5 items-center gap-4 border border-t-0 p-5 text-slate-800 last:rounded-b  hover:bg-slate-50/50">
			<div className="line-clamp-1">{props.name}</div>
			<div className="line-clamp-1">{props.email}</div>
			<div className="line-clamp-1">{props.phone}</div>
			<div className="line-clamp-1">({props.coordinates})</div>
			<div className="justify-self-end rounded">
				<div className="relative py-3 sm:mx-auto sm:max-w-xl">
					<button className="group relative rounded bg-purple-700 p-2 hover:bg-purple-800">
						<Icon className="text-2xl text-slate-50" icon="mdi:pencil-box-outline" />
						<div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 rounded-lg bg-purple-800 px-3 py-2 text-center text-sm text-white opacity-0 group-hover:opacity-100">
							Editar
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}
