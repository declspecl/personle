import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.tsx";
import { PlayPage } from "./pages/Play.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/play",
        element: <PlayPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RootLayout>
            <RouterProvider router={router} />
        </RootLayout>
    </React.StrictMode>
);
