import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";
import { ThemeContext } from "./context/theme";
import router from "./routes";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-full w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}
    >
      <MatchesProvider>
        <ArticlesProvider>
          <SportsProvider>
            <TeamsProvider>
              <RouterProvider router={router} />
            </TeamsProvider>
          </SportsProvider>
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  );
}

export default App;