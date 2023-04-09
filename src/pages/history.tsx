import { useAtom } from "jotai";
import { searchHistoryAtom } from "store";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Key } from "react";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "lib/userData";

export default function History() {
	const router = useRouter();
	const [searchHistory, setSearchHistory]: [any[], any] = useAtom(searchHistoryAtom);
	let parsedHistory: object[] = [];
	let elementsLayout: JSX.Element[] = [];

	if(!searchHistory) return null;

	searchHistory.forEach((h) => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	let historyClicked = async (e: any, index: number) => {
		let data = parsedHistory[index];
		let queryString: string = 	``;

		let obj = parsedHistory[index];
		type ObjectKeys = keyof typeof obj;
		const keysArray = Object.keys(obj) as ObjectKeys[]

		keysArray.forEach((key) => {
			console.log(`Value of ${key}: ${obj[key]}`);

			queryString += `${key}=${obj[key]}`;
		});
		
		router.push(`/artwork?${queryString}`);
	};

	let removeHistoryClicked = async (e: any, index: number) => {
		e.stopPropagation();
		setSearchHistory(await removeFromHistory(searchHistory[index]));
	};

	parsedHistory.forEach((item, index) => {
		type ObjectKeys = keyof typeof item;
		const keysArray = Object.keys(item) as ObjectKeys[];
		let conv: JSX.Element[] = [];

		keysArray.forEach((key) => {
			console.log(`Value of ${key}: ${item[key]}`);
			conv.push(
				<>
					{key}: <strong>{item[key]}</strong>&nbsp;
				</>
			);
		});

		elementsLayout.push(
			<ListGroup.Item className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
				{conv}

				<Button
					className="float-end"
					variant="danger"
					size="sm"
					onClick={(e) => removeHistoryClicked(e, index)}
				>
					&times;
				</Button>
			</ListGroup.Item>
		);
	});

	return (
		<>
			{parsedHistory.length > 0 ? (
				<ListGroup>{elementsLayout}</ListGroup>
			) : (
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Empty</Card.Title>
						<Card.Text>None to Display</Card.Text>
					</Card.Body>
				</Card>
			)}
		</>
	);
}
