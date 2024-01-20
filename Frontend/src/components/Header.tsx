import { useState, Fragment } from "react"
import { Icon } from "@iconify/react"
import { Dialog, Transition } from "@headlessui/react"

export default function Header() {
	const [filterActive, setFilterActive] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)

	const openModal = () => {
		setIsAddModalOpen(true)
	}

	const closeModal = () => {
		setIsAddModalOpen(false)
	}

	return (
		<>
			<header className="grid grid-cols-2 items-center gap-5 bg-slate-800 p-5">
				<h2 className="text-2xl font-semibold text-slate-50">Gerenciamento de Clientes</h2>
				<div className="flex items-center justify-end gap-5">
					{filterActive ? (
						<>
							<button onClick={() => setFilterActive(false)}>
								<Icon className="text-2xl text-slate-50 hover:text-slate-400" icon="mdi:close" />
							</button>
							<div className="flex rounded-md">
								<div className="relative rounded-s-md border-e border-e-slate-300">
									<select
										id="filterType"
										className="h-full rounded-md rounded-e-none bg-slate-200 ps-8 hover:bg-slate-300"
										role="button"
									>
										<option value="">Todos</option>
										<option value="name">Nome</option>
										<option value="email">Email</option>
										<option value="phone">Telefone</option>
									</select>
									<Icon
										className="absolute start-2 top-1/2 -translate-y-1/2 text-2xl text-slate-800"
										icon="mdi:filter"
									/>
								</div>
								<input
									type="search"
									className="w-full px-6 py-2 outline-offset-0"
									placeholder="Pesquisar"
								/>
								<button className="rounded-md rounded-s-none border-s border-s-slate-300 bg-white px-3 py-2 hover:bg-slate-300">
									<Icon className="text-2xl text-slate-800" icon="mdi:search" />
								</button>
							</div>
						</>
					) : (
						<button onClick={() => setFilterActive(true)}>
							<Icon className="text-2xl text-slate-50 hover:text-slate-400" icon="mdi:search" />
						</button>
					)}

					<button
						className="rounded-md bg-slate-300 px-6 py-2 text-slate-800 hover:bg-slate-400"
						onClick={openModal}
					>
						Cadastrar
					</button>
				</div>
			</header>
			<Transition appear show={isAddModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
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
										className="border-b p-3 text-lg font-medium leading-6 text-gray-900"
									>
										Cadastrar Cliente
									</Dialog.Title>
									<div className="p-3">
										<button
											className="rounded-md bg-red-500 px-6 py-2 text-slate-50 hover:bg-red-600"
											onClick={closeModal}
										>
											Cancelar
										</button>
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
