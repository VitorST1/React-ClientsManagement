import List from "../components/Clients/List"
import Header from "../components/Header"

export default function Clients() {
	return (
		<>
			<div className="flex flex-col">
				<Header />
				<div className="m-5 rounded-md border">
					<List />
				</div>
			</div>
		</>
	)
}
