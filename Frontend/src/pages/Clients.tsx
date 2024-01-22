import { useState } from "react"
import List from "../components/Clients/List"
import Header from "../components/Header"
import { useClientsQuery } from "../services/useClientsQuery"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useQueryClient } from "@tanstack/react-query"

// Componente que contém todo o conteúdo dos clientes (header e a lista de clientes).
export default function Clients() {
	const [search, setSearch] = useState("")
	const [searchType, setSearchType] = useState("")
	const queryClient = useQueryClient()

	// Obtendo os clientes
	const { data: clients, error, isLoading, refetch } = useClientsQuery(searchType, search)

	const handleSearch = (searchType: string, search: string) => {
		setSearchType(searchType)
		setSearch(search)
	}

	const refetchClients = async () => {
		await queryClient.invalidateQueries({ queryKey: ["clients", searchType, search] })
		await refetch()
	}

	if (isLoading)
		return (
			<div className="flex max-h-screen flex-col">
				<Header onSearch={handleSearch} onAction={() => refetchClients()} />
				<div className="flex justify-center p-8 text-4xl text-slate-500">
					<Icon className="animate-spin" icon="gg:spinner" />
				</div>
			</div>
		)

	if (error)
		return (
			<div className="flex max-h-screen flex-col">
				<Header onSearch={handleSearch} onAction={() => refetchClients()} />
				<div className="m-8 rounded-md border p-8 text-center text-slate-500">Algo deu errado!</div>
			</div>
		)

	return (
		<>
			<div className="flex max-h-screen flex-col">
				<Header onSearch={handleSearch} onAction={() => refetchClients()} />
				<List clients={clients} onEdit={() => refetchClients()} />
			</div>
		</>
	)
}
