import Clients from "./pages/Clients"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Clients />
		</QueryClientProvider>
	)
}

export default App
