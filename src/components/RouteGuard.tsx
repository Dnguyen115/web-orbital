import { favouritesAtom, searchHistoryAtom } from "store";
import { getFavourites, getHistory } from "lib/userData";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "lib/authenticate";

const PUBLIC_PATHS = ["/register", '/login', '/', '/_error'];

export default function RouteGuard(props: any) {
	const router = useRouter();
	const [favourites, setFavourites]: [object[], any] = useAtom(favouritesAtom);
	const [searchHistory, setSearchHistory]: [object[], any] = useAtom(searchHistoryAtom);

	useEffect(() => {
		async function updateAtoms() {
			setFavourites(await getFavourites());
			setSearchHistory(await getHistory());
		}

		updateAtoms();

		authCheck(router.pathname);
		router.events.on("routeChangeComplete", authCheck);
		return () => {
			router.events.off("routeChangeComplete", authCheck);
		};
	}, [favourites, router.events, router.pathname, searchHistory]);

	function authCheck(url: string) {
		const path = url.split("?")[0];
		if (!PUBLIC_PATHS.includes(path) && !isAuthenticated()) {
			console.log(`trying to request a secure path: ${path}`);
			router.push('/login');
		}
	}

	return <>{props.children}</>;
}
