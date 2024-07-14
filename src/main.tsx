import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/Home.tsx";
import { PlayPage } from "./pages/Play.tsx";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { LeaderboardPage } from "./pages/Leaderboard.tsx";
import { SettingsPage } from "./pages/Settings.tsx";
import { ProfilePage } from "./pages/Profile.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getGuesses } from "./lib/backend/api.ts";

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
                element: <PlayPage />,
                loader: async () => {
                    return getGuesses().then((response) => {
                        if (!response.status.toString().startsWith("2")) {
                            document.cookie = "";
                            
                            for (const cookie of response.headers.getSetCookie()) {
                                console.log(cookie);
                                document.cookie = cookie;
                            }

                            throw new Response(response.statusText, { status: 302, headers: { "Set-Cookie": "", "Location": "/profile" } });
                        }

                        return response.json();
                    });
                }
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
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
