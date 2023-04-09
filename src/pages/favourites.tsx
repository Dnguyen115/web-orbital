import { ArtworkCard } from "@/components/ArtworkCard";
import { useAtom } from "jotai";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { favouritesAtom } from "store";

export default function Favourites() {
	const [favourites, setFavourites]: [string[], any] = useAtom(favouritesAtom);
	const favEleList: JSX.Element[] = [];

	if(!favourites) return null;

	favourites.forEach((fav) => {
		favEleList.push(
			<Col lg={3} key={fav}>
				<ArtworkCard objectID={fav} />
			</Col>
		);
	});

	return <>{favEleList.length > 0 ? <Row className="gy-4">{favEleList}</Row> : "You have no favourites."}</>;
}
