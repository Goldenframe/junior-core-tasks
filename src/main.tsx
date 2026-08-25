import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app/app";

const url = import.meta.env.VITE_BASE_URL;
if (!url || !url.startsWith("http")) {
  console.error("Невалидный URL");
  throw new Error("VITE_BASE_URL must be valid URL");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
