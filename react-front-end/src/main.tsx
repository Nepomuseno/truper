import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TruperApp } from "./TruperApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TruperApp />
  </StrictMode>
);
