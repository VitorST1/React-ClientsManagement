import { useQuery } from "@tanstack/react-query"

const fetchVisitationOrder = async () => {
    const url = `${import.meta.env.VITE_BASEURL}:${import.meta.env.VITE_PORT}/clients/visitationOrder`
 
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
 
    const response = await fetch(url, requestOptions)
    return response.json()
}

export const useVisitationOrderQuery = () => 
    useQuery({
        queryKey: ["visitationOrder"],
        queryFn: () => fetchVisitationOrder(),
    })