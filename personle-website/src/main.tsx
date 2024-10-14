import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/Home.tsx";
import { PlayPage } from "./pages/Play.tsx";
import personaData from "./data/persona-data.json";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LeaderboardPage } from "./pages/Leaderboard.tsx";
import { SettingsPage } from "./pages/Settings.tsx";
import { ProfilePage } from "./pages/Profile.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersonaDataByNameProvider, PersonaNamesProvider } from "./context/PersonaDataContext.tsx";
import { PersonaData } from "./lib/server/model.ts";

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
                path: "/play",
                element: <PlayPage />
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
