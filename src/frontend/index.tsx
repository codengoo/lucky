import React from "react";
import { createRoot } from "react-dom/client";
import Frontend from "./App";
import { MessageProvider } from "@admin/store/message";

const app = createRoot(document.getElementById("#wplk-frontend-app")!);
app.render(
    <MessageProvider>
        <Frontend />
    </MessageProvider>
);