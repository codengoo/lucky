import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "../index.css";

const app = createRoot(document.getElementById("wplk-admin-app")!);
app.render(
    <RouterProvider router={router} />
);
