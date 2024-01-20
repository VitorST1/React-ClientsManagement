import { Icon } from "@iconify/react"

export default function List() {
	return (
		<div className="grid grid-cols-4 items-center gap-3 rounded border p-5 text-slate-800">
			<div className="line-clamp-1">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis magnam architecto
				ratione laborum dolores laudantium aliquid sit, dolorem quidem consequatur doloremque, unde
				beatae, voluptatem modi ullam porro facilis eos blanditiis!
			</div>
			<div className="line-clamp-1">Email</div>
			<div className="line-clamp-1">Telefone</div>
			<div className="justify-self-end rounded">
				<div className="relative py-3 sm:mx-auto sm:max-w-xl">
					<button className="group relative rounded bg-purple-700 p-2 hover:bg-purple-800">
						<Icon className="text-2xl" color="white" icon="mdi:pencil-box-outline" />
						<div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 rounded-lg bg-purple-800 px-3 py-2 text-center text-xs text-white opacity-0 group-hover:opacity-100">
							Editar
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}
