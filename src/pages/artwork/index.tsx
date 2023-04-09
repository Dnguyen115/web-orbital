import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Error from "next/error";
import { Col, Pagination, Row } from "react-bootstrap";
import { ArtworkCard } from "@/components/ArtworkCard";
import voidlist from 'public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
	let router = useRouter();
	let finalQuery = router.asPath.split("?")[1];
	const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

	const [artworkList, setArtworkList]: [any[], any] = useState([]);
	const [page, setPage] = useState(1);

	const nextPage = () => {
		if (page < artworkList.length) setPage(page + 1);
	};

	const previousPage = () => {
		if (page > 1) setPage(page - 1);
	};

	useEffect(() => {
		let results: any[] = [];
		let filteredResults = voidlist.objectIDs.filter(x => data?.objectIDs?.includes(x));
		
		if (data) {
			for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
				const chunk = filteredResults.slice(i, i + PER_PAGE);
				results.push(chunk);
			}

			setArtworkList(results);
			setPage(1);
		}
	}, [data]);

	if (error) return <Error statusCode={404} />;

	if (artworkList.length == 0) return <h4>Nothing Here</h4>;

	if (!artworkList) return <></>;

	let row_renders: JSX.Element[] = [];

	artworkList[page - 1].forEach((item: any) => {
		row_renders.push(
			<Col lg={3} key={item}>
				<ArtworkCard objectID={item} />
			</Col>
		);
	});

	return (
		<>
			<Row className="gy-4">{row_renders}</Row>
			{artworkList.length > 0 ? (
				<Pagination>
					<Pagination.Prev onClick={() => previousPage()} />
					<Pagination.Item active>{page}</Pagination.Item>
					<Pagination.Next onClick={() => nextPage()} />
				</Pagination>
			) : null}
		</>
	);
}
