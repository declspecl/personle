import "./index.css";

import gsap from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import ReactDOM from "react-dom/client";
import { HomePage } from "@pages/HomePage.tsx";
import { StatsPage } from "@pages/StatsPage.tsx";
import personaData from "@data/persona-data.json";
import { PersonaData } from "@lib/server/model.ts";
import { RootLayout } from "@layouts/RootLayout.tsx";
import { FreePlayPage } from "@pages/FreePlayPage.tsx";
import { DailyPlayPage } from "@pages/DailyPlayPage.tsx";
import { CompendiumPage } from "@pages/CompendiumPage.tsx";
import { SubPageLayout } from "@layouts/SubPageLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersonaDataByNameProvider, PersonaNamesProvider } from "@context/PersonaDataContext.tsx";

gsap.registerPlugin(useGSAP);

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <RootLayout />,
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
            <PersonaDataByNameProvider personaDataByName={personaData as Record<string, PersonaData>}>
                <PersonaNamesProvider personaNames={Object.keys(personaData)}>
                    <RouterProvider router={router} />
                </PersonaNamesProvider>
            </PersonaDataByNameProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
