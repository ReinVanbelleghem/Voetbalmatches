import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import Admin_Home from "./admin/Home";
import Match from "./match";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/admin",
        element: <Admin_Home />
    },
    {
        path: "/match/:id",
        element: <Match />
    }
]);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router}></RouterProvider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
