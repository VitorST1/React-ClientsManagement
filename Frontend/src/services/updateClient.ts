export const updateClient = async (body: any) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(
        `${import.meta.env.VITE_BASEURL}:${import.meta.env.VITE_PORT}/clients/${body.id}`,
        requestOptions
    )
    return response.json()
}