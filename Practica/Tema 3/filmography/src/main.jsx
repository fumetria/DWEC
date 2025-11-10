import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FilmProvider } from "./components/FilmContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilmProvider>
      <App />
    </FilmProvider>
  </StrictMode>
);
