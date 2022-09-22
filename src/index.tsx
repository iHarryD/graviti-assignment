import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DirectionProvider } from "./contexts/DirectionContext";
import "./styles/global.css";
import "./styles/variables.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <DirectionProvider>
      <App />
    </DirectionProvider>
  </StrictMode>
);
