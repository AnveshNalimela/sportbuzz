import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { MatchesProvider } from "./context/matches/context";
import { ThemeContext } from "./context/theme";
import router from "./routes";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}
    >
      <MatchesProvider>
        <RouterProvider router={router} />;
      </MatchesProvider>
    </div>
  );
}

export default App;
