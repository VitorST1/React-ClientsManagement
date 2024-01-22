import { useQuery } from "@tanstack/react-query"

const fetchClients = async (type: string, search: string) => {
    let queryParams = ""

    if(type && search) {
        queryParams = `?type=${type}&search=${search}`
    } else if(search) {
        queryParams = `?search=${search}`
    }

    const url = `${import.meta.env.VITE_BASEURL}:${import.meta.env.VITE_PORT}/clients${queryParams}`
 
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
 
    const response = await fetch(url, requestOptions)
    return response.json()
}

export const useClientsQuery = (type: string, search: string) => 
    useQuery({
        queryKey: ["clients", type, search],
        queryFn: () => fetchClients(type, search)
    })