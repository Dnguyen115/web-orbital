import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "store";
import { stringify } from "querystring";
import { addToHistory } from "lib/userData";

export default function AdvancedSearch() {
	const router = useRouter();
	const [searchHistory, setSearchHistory]: [string[], any] = useAtom(searchHistoryAtom);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			searchBy: "title",
			geoLocation: "",
			medium: "",
			isOnView: false,
			isHighlight: false,
			q: "",
		},
	});

	const submitForm = async (data: any) => {
		let queryString: string = `${data.searchBy}=true${data.geoLocation ? "&geoLocation=" + data.geoLocation : ""}${data.medium ? "&medium=" + data.medium : ""}&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;

		setSearchHistory(await addToHistory(queryString));
		router.push(`/artwork?${queryString}`);
	};

	return (
		<>
			<Form onSubmit={handleSubmit(submitForm)}>
				<Row>
					<Col>
						<Form.Group className="mb-3">
							<Form.Label>Search Query</Form.Label>
							<Form.Control type="text" placeholder="" {...register("q")} required />
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Form.Label>Search By</Form.Label>
						<Form.Select className="mb-3" {...register("searchBy")}>
							<option value="title">Title</option>
							<option value="tags">Tags</option>
							<option value="artistOrCulture">Artist or Culture</option>
						</Form.Select>
					</Col>
					<Col md={4}>
						<Form.Group className="mb-3">
							<Form.Label>Geo Location</Form.Label>
							<Form.Control type="text" placeholder="" {...register("geoLocation")} />
							<Form.Text className="text-muted">
								Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;,
								&quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the |
								operator
							</Form.Text>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group className="mb-3">
							<Form.Label>Medium</Form.Label>
							<Form.Control type="text" placeholder="" {...register("medium")} />
							<Form.Text className="text-muted">
								Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;,
								&quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
								values separated by the | operator
							</Form.Text>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
						<Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
					</Col>
				</Row>
				<Row>
					<Col>
						<br />
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
