import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import App from "./App.jsx";
import FocusPage from "./page/focuspage/focuspage.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/*<App />*/}
      <FocusPage />
    </BrowserRouter>
  </StrictMode>
);
