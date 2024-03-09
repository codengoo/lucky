import React from "react";
import { createRoot } from "react-dom/client";
import { BankQRProvider } from "@admin/store/bankQR";
import Frontend from "./App";

const app = createRoot(document.getElementById("#wplk-frontend-app")!);
app.render(
    <BankQRProvider>
        <Frontend />
    </BankQRProvider>
);