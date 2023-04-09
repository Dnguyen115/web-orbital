import { setToken, removeToken, getToken, isAuthenticated } from "./authenticate";
import useSWR from "swr";

const fetcher = (url: string, method: string) =>
	fetch(url, { method: method, headers: { Authorization: `JWT ${getToken()}` } }).then((res) => res.json());

export async function addToFavourites(id: string) {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
				method: "PUT",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}
export async function removeFromFavourites(id: string) {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
				method: "DELETE",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}
export async function getFavourites() {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
				method: "GET",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}

export async function addToHistory(id: string) {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
				method: "PUT",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}
export async function removeFromHistory(id: string) {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
				method: "DELETE",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}
export async function getHistory() {
	return new Promise(async (resolve, reject) => {
		if (isAuthenticated()) {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
				method: "GET",
				headers: { Authorization: `JWT ${getToken()}` },
			});

			if (res.status === 200) {
				resolve(await res.json());
			} else {
				reject([]);
			}
		} else {
			reject([]);
		}
	});
}
