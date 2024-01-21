import List from "../components/Clients/List"
import Header from "../components/Header"

export default function Clients() {
	return (
		<>
			<div className="flex max-h-screen flex-col">
				<Header />
				<List />
			</div>
		</>
	)
}
