import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/HomePage.tsx";
import { DailyPlayPage } from "./pages/DailyPlayPage.tsx";
import personaData from "./data/persona-data.json";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LeaderboardPage } from "./pages/LeaderboardPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersonaDataByNameProvider, PersonaNamesProvider } from "./context/PersonaDataContext.tsx";
import { PersonaData } from "./lib/server/model.ts";
import { FreePlayPage } from "./pages/FreePlayPage.tsx";

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
                path: "/daily",
                element: <DailyPlayPage />
            },
            {
                path: "/freeplay",
                element: <FreePlayPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/leaderboard",
                element: <LeaderboardPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
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
