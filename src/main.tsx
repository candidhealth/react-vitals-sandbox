import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Tooltip } from "@candidhealth/react-vitals";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tooltip.Provider>
      <App />
    </Tooltip.Provider>
  </StrictMode>,
);
