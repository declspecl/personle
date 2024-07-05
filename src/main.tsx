import "./index.css";

import React from "react";
import { App } from "./App.tsx";
import ReactDOM from "react-dom/client";
import { RootLayout } from "./layouts/RootLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RootLayout>
            <App />
        </RootLayout>
    </React.StrictMode>
);
