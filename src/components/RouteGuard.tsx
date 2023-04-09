
import { favouritesAtom, searchHistoryAtom } from "store";
import { getFavourites, getHistory } from "lib/userData";
import { useAtom } from "jotai";
import { useEffect } from "react";

const PUBLIC_PATH = ["/register"]

export default function RouteGuard(props: any) {
	const [favourites, setFavourites]: [object[], any] = useAtom(favouritesAtom);
	const [searchHistory, setSearchHistory]: [object[], any] = useAtom(searchHistoryAtom);

	async function updateAtoms() {
		setFavourites(await getFavourites());
		setSearchHistory(await getHistory());
	}

	useEffect(() => {
		updateAtoms();
	}, [favourites, searchHistory]);

	return <>{props.children}</>;
}
