import "@/styles/globals.css";
import "@/styles/bootstrap_flux/bootstrap.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RouteGuard>
		<Layout>
			<SWRConfig
				value={{
					fetcher: async (url) => {
						const res = await fetch(url);
						if (!res.ok) {
							const error = new Error("An error occurred while fetching the data.");
							throw error;
						}
						return res.json();
					},
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</Layout>
		</RouteGuard>
	);
}
