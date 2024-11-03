import "./index.css";

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ReactDOM from "react-dom/client";
import { ErrorPage } from "@pages/ErrorPage";
import { HomePage } from "@pages/HomePage.tsx";
import { personaData } from "@data/personaData";
import { StatsPage } from "@pages/StatsPage.tsx";
import { RootLayout } from "@layouts/RootLayout.tsx";
import { FreePlayPage } from "@pages/FreePlayPage.tsx";
import { DailyPlayPage } from "@pages/DailyPlayPage.tsx";
import { CompendiumPage } from "@pages/CompendiumPage.tsx";
import { SubPageLayout } from "@layouts/SubPageLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersonaDataByNameProvider, PersonaNamesProvider } from "@context/PersonaDataContext.tsx";

gsap.registerPlugin(useGSAP);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		}
	}
});

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <HomePage />
			},
			{
				element: <SubPageLayout />,
				children: [
					{
						path: "/daily",
						element: <DailyPlayPage />
					},
					{
						path: "/freeplay",
						element: <FreePlayPage />
					},
					{
						path: "/stats",
						element: <StatsPage />
					},
					{
						path: "/compendium",
						element: <CompendiumPage />
					}
				]
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PersonaDataByNameProvider personaDataByName={personaData}>
				<PersonaNamesProvider personaNames={Object.keys(personaData)}>
					<RouterProvider router={router} />
				</PersonaNamesProvider>
			</PersonaDataByNameProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
