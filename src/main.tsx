import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RootLayout } from "./layouts/RootLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Play } from "./pages/Play.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/play",
        element: <Play />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RootLayout>
            <RouterProvider router={router} />
        </RootLayout>
    </React.StrictMode>
);
