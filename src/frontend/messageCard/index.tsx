import React from "react";
import { createRoot } from "react-dom/client";
import { BankQRProvider } from "src/store/bankQR";
import Frontend from "./App";

const app = createRoot(document.getElementById("wpsf-frontend-app")!);
app.render(
    <BankQRProvider>
        <Frontend />
    </BankQRProvider>
);