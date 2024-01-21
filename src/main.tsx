import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import Toastr from "./components/Toastr/index.tsx";

const router = createBrowserRouter([
    {
        path: "/:roomId",
        element: <ChatPage />,
    },
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
        <Toastr>
            <RouterProvider router={router} />
        </Toastr>
    </React.StrictMode>
);
