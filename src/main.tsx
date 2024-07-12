import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/Home.tsx";
import { PlayPage } from "./pages/Play.tsx";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LeaderboardPage } from "./pages/Leaderboard.tsx";
import { SettingsPage } from "./pages/Settings.tsx";
import { ProfilePage } from "./pages/Profile.tsx";

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
        <RouterProvider router={router} />
    </React.StrictMode>
);
