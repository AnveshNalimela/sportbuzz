import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layout/home";
import Matches from "../pages/home";
import Container from "../pages/home/Container";
import MatchDetails from "../pages/match_details";
import Signin from "../pages/signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signin />,
  },

  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Navigate to="/home/matches" replace /> },
      {
        path: "matches",
        element: <Container />,
        children: [
          { index: true, element: <Matches /> },
          {
            path: ":matchID",
            element: <MatchDetails />,
            children: [{ index: true, element: <></> }],
          },
        ],
      },
    ],
  },
]);

export default router;
