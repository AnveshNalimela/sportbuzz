import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import React from "react";
import { ThemeProvider } from "./context/theme.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
