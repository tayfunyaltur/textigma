import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";

const router = createBrowserRouter([
    {
        path: "/chat",
        element: <ChatPage />,
    },
    {
        path: "/*",
        element: <LandingPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
