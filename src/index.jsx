import { createRoot } from "react-dom/client";
import { SpaContainer } from "pankosmia-rcl";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <SpaContainer>
    <App />
  </SpaContainer>,
);
