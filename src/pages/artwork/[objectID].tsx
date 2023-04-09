import { ArtworkCardDetail } from "@/components/ArtworkCard";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

export default function ArtworkById() {
	let router = useRouter();
	let objectID = router.query.objectID;

	return (
		<>
			<Row>
				<Col>
					<ArtworkCardDetail objectID={objectID} />
				</Col>
			</Row>
		</>
	);
}
