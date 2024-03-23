import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "../index.css";
import 'react-toastify/dist/ReactToastify.css';

const el = document.getElementById("wplk-admin-app");
if (el) {
    const app = createRoot(el);
    app.render(
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}
