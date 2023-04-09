import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props: any) {
	return (
		<>
			<MainNav />
			<br />
			<br />
			<br />
			<Container>{props.children}</Container>
			<br />
		</>
	);
}
