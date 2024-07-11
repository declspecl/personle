import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/Home.tsx";
import { PlayPage } from "./pages/Play.tsx";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
