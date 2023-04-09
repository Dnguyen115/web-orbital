/* eslint-disable react/no-unescaped-entities */

import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Button, Card, Container } from "react-bootstrap";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { favouritesAtom } from "store";
import { addToFavourites, removeFromFavourites } from "lib/userData";

export function ArtworkCard(props: any) {
	let object_id = props.objectID;
	const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${object_id}`);

	if (error) return <Error statusCode={404} />;
	if (!data) return null;

	return (
		<>
			<Card style={{ width: "18rem" }}>
				<Card.Img
					variant="top"
					src={
						data.primaryImageSmall
							? data.primaryImageSmall
							: "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
					}
				/>
				<Card.Body>
					<Card.Title>{data.title}</Card.Title>
					<Card.Text>
						<b>Date</b>
						{data.objectDate ? data.objectDate : "N/A"}
						<b>Classification</b>
						{data.classification ? data.classification : "N/A"}
						<b>Medium</b>
						{data.medium ? data.medium : "N/A"}
					</Card.Text>
					<Link href={`/artwork/${object_id}`} passHref>
						<Button variant="primary">
							<strong>ID: </strong>
							{object_id}
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</>
	);
}

export function ArtworkCardDetail(props: any) {
	let object_id: string = props.objectID;
	const { data, error } = useSWR(
		object_id ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${object_id}` : null
	);
	const [favourites, setFavourites]: [string[], any] = useAtom(favouritesAtom);
	const [showAdded, setShowAdded] = useState(false);

	const addFavourite = async (item: string) => {
		setFavourites(await addToFavourites(item));
	};

	const removeFavourite = async (item: string) => {
		setFavourites(await removeFromFavourites(item));
	};

	let favouritesClicked = async () => {
		if (showAdded) {
			removeFavourite(object_id);
			setShowAdded(false);
		} else {
			addFavourite(object_id);
			setShowAdded(true);
		}
	};

	useEffect(() => {
		setShowAdded(favourites?.includes(object_id));
	}, [favourites, object_id]);

	if (error) return <Error statusCode={404} />;
	if (!data) return null;

	return (
		<>
			<Container>
				<Card>
					{data.primaryImage ? <Card.Img variant="top" src={data.primaryImage} /> : <></>}
					<Card.Body>
						<Card.Title>{data.title}</Card.Title>
						<Card.Text>
							<strong>Date: </strong>
							{data.objectDate ? data.objectDate : "N/A"}
							<br />
							<strong>Classification: </strong>
							{data.classification ? data.classification : "N/A"}
							<br />
							<strong>Medium: </strong>
							{data.medium ? data.medium : "N/A"}
							<br />
							<br />
							<strong>Artist: </strong>
							{data.artistDisplayName ? data.artistDisplayName : "N/A"}
							<br />
							<strong>Credit Line: </strong>
							{data.creditLine ? data.creditLine : "N/A"}
							<br />
							<strong>Dimensions: </strong>
							{data.dimensions ? data.dimensions : "N/A"}
							<br />
							<Button
								variant={showAdded ? "primary" : "outline-primary"}
								onClick={() => favouritesClicked()}
							>
								{showAdded ? "+ Favourite (Added)" : "+ Favourite"}
							</Button>
						</Card.Text>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}
