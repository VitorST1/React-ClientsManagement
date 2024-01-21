import { useState, Fragment, FormEvent } from "react"
import { Icon } from "@iconify/react"
import { Dialog, Transition } from "@headlessui/react"
import { Client } from "../types/types"
import ClientInfo from "./Clients/ClientInfo"

export default function Header() {
	const [filterActive, setFilterActive] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isClosestRouteModalOpen, setIsClosestRouteModalOpen] = useState(false)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [coordinateX, setCoordinateX] = useState(0)
	const [coordinateY, setCoordinateY] = useState(0)

	const openAddModal = () => {
		setIsAddModalOpen(true)
	}

	const closeAddModal = () => {
		setIsAddModalOpen(false)
	}

	const openClosestRouteModal = () => {
		setIsClosestRouteModalOpen(true)
	}

	const closeClosestRouteModal = () => {
		setIsClosestRouteModalOpen(false)
	}

	const addClient = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log({ name, email, phone, coordinateX, coordinateY })
		if (!name || isNaN(coordinateX) || isNaN(coordinateY)) return false
		closeAddModal()
	}

	const getClosestRoute = () => {}

	const clients: Client[] = []

	return (
		<>
			<header className="grid grid-cols-4 items-center gap-5 bg-indigo-600 px-8 py-5">
				<h2 className="text-2xl font-semibold text-slate-50">Gerenciamento de Clientes</h2>
				<div className="col-span-3 flex items-center justify-end gap-5">
					{filterActive ? (
						<>
							<button onClick={() => setFilterActive(false)}>
								<Icon className="text-2xl text-slate-50 hover:text-slate-400" icon="mdi:close" />
							</button>
							<div className="flex rounded-md">
								<div className="relative rounded-s-md border-e border-e-slate-300">
									<select
										id="filterType"
										className="h-full rounded-md rounded-e-none bg-blue-400 ps-8 text-slate-50 hover:bg-blue-500"
										role="button"
									>
										<option value="">Todos</option>
										<option value="name">Nome</option>
										<option value="email">Email</option>
										<option value="phone">Telefone</option>
									</select>
									<Icon
										className="absolute start-2 top-1/2 -translate-y-1/2 text-2xl text-slate-50"
										icon="mdi:filter"
									/>
								</div>
								<input
									type="search"
									className="w-full px-6 py-2 outline-offset-0"
									placeholder="Pesquisar"
								/>
								<button className="rounded-md rounded-s-none border-s border-s-slate-300 bg-blue-400 px-3 py-2 hover:bg-blue-500">
									<Icon className="text-2xl text-slate-50" icon="mdi:search" />
								</button>
							</div>
						</>
					) : (
						<button onClick={() => setFilterActive(true)}>
							<Icon className="text-2xl text-slate-50 hover:text-slate-400" icon="mdi:search" />
						</button>
					)}

					<button
						className="rounded-md border border-slate-50 px-6 py-2 text-slate-50 hover:bg-slate-50 hover:text-slate-800"
						onClick={() => (openClosestRouteModal(), getClosestRoute())}
					>
						Ordem de Visitação
					</button>

					<button
						className="rounded-md bg-blue-400 px-6 py-2 text-slate-50 hover:bg-blue-500"
						onClick={openAddModal}
					>
						Cadastrar
					</button>
				</div>
			</header>
			<Transition appear show={isAddModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeAddModal}>
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
										Cadastrar Cliente
									</Dialog.Title>
									<div className="p-4">
										<form className="flex flex-col gap-4" onSubmit={addClient}>
											<div>
												<label htmlFor="name" className="text-sm font-medium text-slate-800">
													Nome:
												</label>
												<input
													type="text"
													id="name"
													className="block w-full rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
													placeholder="Nome"
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
													onChange={(e) => setPhone(e.target.value)}
												/>
											</div>
											<div className="flex gap-4">
												<div>
													<label
														htmlFor="coordinateX"
														className="text-sm font-medium text-slate-800"
													>
														Coordenada X:
													</label>
													<input
														type="number"
														id="coordinateX"
														className="rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
														placeholder="X"
														min={0}
														required
														onChange={(e) => setCoordinateX(Number(e.target.value))}
													/>
												</div>
												<div>
													<label
														htmlFor="coordinateY"
														className="text-sm font-medium text-slate-800"
													>
														Coordenada Y:
													</label>
													<input
														type="number"
														id="coordinateY"
														className="rounded-md border border-slate-300 bg-slate-50 p-2.5 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
														placeholder="Y"
														min={0}
														required
														onChange={(e) => setCoordinateY(Number(e.target.value))}
													/>
												</div>
											</div>
											<div className="flex gap-4">
												<button
													type="submit"
													className="rounded-md bg-indigo-500 px-6 py-2 text-slate-50 hover:bg-indigo-600"
												>
													Cadastrar
												</button>
												<button
													type="button"
													className="rounded-md bg-red-500 px-6 py-2 text-slate-50 hover:bg-red-600"
													onClick={closeAddModal}
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
			<Transition appear show={isClosestRouteModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeClosestRouteModal}>
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
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="flex items-center justify-between border-b p-4 text-lg font-medium leading-6 text-slate-900"
									>
										<div>Ordem de Visitação</div>
										<button onClick={closeClosestRouteModal}>
											<Icon icon="mdi:close" />
										</button>
									</Dialog.Title>
									<div className="p-4">
										{!clients.length ? (
											<div className="p-8 text-center text-slate-500">
												Nenhum cliente encontrado!
											</div>
										) : (
											<>
												<div className="grid grid-cols-4 items-center gap-4 rounded rounded-b-none border bg-slate-50 px-5 py-3 font-semibold text-slate-800">
													<div>Nome</div>
													<div>Email</div>
													<div>Telefone</div>
													<div>Coordenadas</div>
												</div>
												{clients.map((client) => (
													<ClientInfo key={client.id} client={client} hideEditButton={true} />
												))}
											</>
										)}
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
