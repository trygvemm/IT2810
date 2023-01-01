import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";

export default function Home(props: { idHook: any }) {
	return (
		<div className="flex flex-col h-screen">
			<Searchbar></Searchbar>
			<div className="pt-16">
				<Table idHook={props.idHook}></Table>
			</div>
			<Footer></Footer>
		</div>
	);
}
