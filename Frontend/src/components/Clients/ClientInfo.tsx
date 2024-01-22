import { Icon } from "@iconify/react/dist/iconify.js"
import { Client } from "../../types/types"
import { Dialog, Transition } from "@headlessui/react"
import { useState, Fragment, FormEvent } from "react"

// Contém as informações do cliente.
export default function ClientInfo(props: { client: Client; hideEditButton?: boolean }) {
	const client = props.client
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [name, setName] = useState(client.name)
	const [email, setEmail] = useState(client.email)
	const [phone, setPhone] = useState(client.phone)
	const [coordinatex, setCoordinatex] = useState(client.coordinatex)
	const [coordinatey, setCoordinatey] = useState(client.coordinatey)

	const openEditModal = () => {
		setIsEditModalOpen(true)
	}

	const closeEditModal = () => {
		setIsEditModalOpen(false)
	}

	const editClient = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log({ name, email, phone, coordinatex, coordinatey })
		if (!name || isNaN(coordinatex) || isNaN(coordinatey)) return false

		closeEditModal()
	}

	return (
		<>
			<div
				className={`grid items-center gap-4 border border-t-0 p-5 text-slate-800 last:rounded-b  hover:bg-slate-50/50 ${props.hideEditButton ? "grid-cols-4" : "grid-cols-5"}`}
			>
				<div className="line-clamp-1">{client.name}</div>
				<div className="line-clamp-1">{client.email}</div>
				<div className="line-clamp-1">{client.phone}</div>
				<div className="line-clamp-1">
					({client.coordinatex},{client.coordinatey})
				</div>
				{!props.hideEditButton && (
					<div className="justify-self-end rounded">
						<div className="relative">
							<button
								className="group relative rounded bg-indigo-500 p-2 hover:bg-indigo-600"
								onClick={openEditModal}
							>
								<Icon className="text-2xl text-slate-50" icon="mdi:pencil-box-outline" />
								<div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 w-max -translate-x-1/2 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm text-white opacity-0 group-hover:opacity-100">
									Editar
								</div>
							</button>
						</div>
					</div>
				)}
			</div>
			<Transition appear show={isEditModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeEditModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="border-b p-4 text-lg font-medium leading-6 text-slate-900"
									>
										Editar Cliente
									</Dialog.Title>
									<div className="p-4">
										<form className="flex flex-col gap-4" onSubmit={editClient}>
											<div>
												<label htmlFor="name" className="text-sm font-medium text-slate-800">
													Nome:
												</label>
												<input
													type="text"
													id="name"
													className="block w-full rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
													placeholder="Nome"
													value={name}
													required
													onChange={(e) => setName(e.target.value)}
												/>
											</div>
											<div>
												<label htmlFor="email" className="text-sm font-medium text-slate-800">
													Email:
												</label>
												<input
													type="email"
													id="email"
													className="block w-full rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
													placeholder="Email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
											<div>
												<label htmlFor="phone" className="text-sm font-medium text-slate-800">
													Telefone:
												</label>
												<input
													type="tel"
													id="phone"
													className="block w-full rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
													placeholder="Telefone"
													value={phone}
													onChange={(e) => setPhone(e.target.value)}
												/>
											</div>
											<div className="flex gap-4">
												<div>
													<label
														htmlFor="coordinatex"
														className="text-sm font-medium text-slate-800"
													>
														Coordenada X:
													</label>
													<input
														type="number"
														id="coordinatex"
														className="rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
														placeholder="X"
														min={0}
														value={coordinatex}
														required
														onChange={(e) => setCoordinatex(Number(e.target.value))}
													/>
												</div>
												<div>
													<label
														htmlFor="coordinatey"
														className="text-sm font-medium text-slate-800"
													>
														Coordenada Y:
													</label>
													<input
														type="number"
														id="coordinatey"
														className="rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
														placeholder="Y"
														min={0}
														value={coordinatey}
														required
														onChange={(e) => setCoordinatey(Number(e.target.value))}
													/>
												</div>
											</div>
											<div className="flex gap-4">
												<button
													type="submit"
													className="rounded-md bg-indigo-500 px-6 py-2 text-slate-50 hover:bg-indigo-600"
												>
													Editar
												</button>
												<button
													type="button"
													className="rounded-md bg-red-500 px-6 py-2 text-slate-50 hover:bg-red-600"
													onClick={closeEditModal}
												>
													Cancelar
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
