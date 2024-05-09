import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layout/account";
import HomeLayout from "../layout/home";
import Logout from "../pages/logout";
import MatchDetails from "../pages/match_details";
import Matches from "../pages/matches";
import Container from "../pages/matches/Container";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ProtectedRoute from "./ProtectedRoute";

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
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
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
            path: ":matchId",
            element: <MatchDetails />,
            children: [{ index: true, element: <></> }],
          },
        ],
      },
    ],
  },
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
  },
]);

export default router;
