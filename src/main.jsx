import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import App from "./App.jsx";
import AttentionPage from "./page/attentionpage/attentionpage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*<App />*/}
    <AttentionPage />
  </StrictMode>
);
