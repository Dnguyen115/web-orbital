import { Card, Form, Alert, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";

import { registerUser } from "@/../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

export function AlertWarning(props: any) {
	let warning: string = props.warning;

	return (
		<>
			{warning.length > 0 ? (
				<>
					<br />
					<Alert variant="danger">{warning}</Alert>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default function Login(props: any) {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const [warning, setWarning] = useState("");
	const router = useRouter();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		await registerUser(user, password, password2)
			.then((res) => {
				router.push("/login");
			})
			.catch((err) => {
				setWarning(err.message);
			});
	}

	return (
		<>
			<Card bg="light">
				<Card.Body>
					<h2>Register</h2>Enter your account details below:
				</Card.Body>
			</Card>
			<br />
			<Form onSubmit={handleSubmit}>
				<AlertWarning warning={warning} />
				<Form.Group>
					<Form.Label>User:</Form.Label>
					<Form.Control
						type="text"
						value={user}
						id="userName"
						name="userName"
						onChange={(e) => setUser(e.target.value)}
					/>
				</Form.Group>
				<br />
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type="password"
						value={password}
						id="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Repeat Password:</Form.Label>
					<Form.Control
						type="password"
						value={password2}
						id="password2"
						name="password2"
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</Form.Group>
				<br />
				<Button variant="primary" className="pull-right" type="submit">
					Register
				</Button>
			</Form>
		</>
	);
}
