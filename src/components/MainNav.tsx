import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { searchHistoryAtom } from "store";
import { useAtom } from "jotai";
import { addToHistory } from "lib/userData";
import { getToken, isAuthenticated, removeToken } from "lib/authenticate";

export default function MainNav() {
	const router = useRouter();
	let search_value = "";
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchHistory, setSearchHistory]: [string[], any] = useAtom(searchHistoryAtom);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsExpanded(false);
		if (search_value.length > 3) {
			setSearchHistory(await addToHistory(`title=true&q=${search_value}`));
			router.push(`/artwork?title=true&q=${search_value}`);
		}
	};

	return (
		<>
			<Navbar bg="dark" expand="lg" className="fixed-top navbar-dark" expanded={isExpanded}>
				<Container>
					<Navbar.Brand>Duy Nguyen</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={() => {
							setIsExpanded(!isExpanded);
						}}
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link
								href="/"
								legacyBehavior
								passHref
								onClick={() => {
									setIsExpanded(false);
								}}
							>
								<Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
							</Link>
							{isAuthenticated() ? (
								<>
									<Link
										href="/search"
										legacyBehavior
										passHref
										onClick={() => {
											setIsExpanded(false);
										}}
									>
										<Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
									</Link>
								</>
							) : (
								<>
								<Nav className="me-auto">
									<Link
										href="/login"
										legacyBehavior
										passHref
										onClick={() => {
											setIsExpanded(false);
										}}
									>
										<Nav.Link active={router.pathname === "/"}>LOGIN</Nav.Link>
									</Link>
								</Nav>
							</>
							)}
						</Nav>
						&nbsp;
						{isAuthenticated() ? (
							<Form className="d-flex" onSubmit={handleSubmit}>
								<Form.Control
									type="search"
									placeholder="Search"
									className="me-2"
									aria-label="Search"
									onChange={(event) => {
										search_value = event.target.value;
									}}
								/>
								<Button variant="outline-success" type="submit">
									Search
								</Button>
							</Form>
						) : (
							<></>
						)}
						&nbsp;
						{isAuthenticated() ? (
							// Due to the Token is extremely long, i shorted it to just 15 chars
							<NavDropdown title={getToken()?.substring(0, 15)} id="basic-nav-dropdown">
								<Link href="/favourites" legacyBehavior passHref>
									<NavDropdown.Item
										onClick={() => {
											setIsExpanded(false);
										}}
										active={router.pathname === "/favourites"}
									>
										Favourites
									</NavDropdown.Item>
								</Link>
								<Link href="/history" legacyBehavior passHref>
									<NavDropdown.Item
										onClick={() => {
											setIsExpanded(false);
										}}
										active={router.pathname === "/history"}
									>
										History
									</NavDropdown.Item>
								</Link>
								<Link href="/login" legacyBehavior passHref>
									<NavDropdown.Item
										onClick={() => {
											setIsExpanded(false);
											removeToken();
										}}
										active={router.pathname === "/login"}
									>
										Logout
									</NavDropdown.Item>
								</Link>
							</NavDropdown>
						) : (
							<></>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<br />
			<br />
		</>
	);
}
