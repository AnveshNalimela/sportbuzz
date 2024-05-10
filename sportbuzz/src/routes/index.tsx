import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layout/account";
import HomeLayout from "../layout/home";
import Articles from "../pages/Articles";
import Home from "../pages/home";
import Container from "../pages/home/Container";
import Logout from "../pages/logout";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ProtectedRoute from "./ProtectedRoute";
import Match from "../pages/match";

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
      { index: true, element: <Navigate to="/home/index" replace /> },
      {
        path: "index",
        element: <Container />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "matches/:matchID",
            element: <Match />,
          },
          {
            path: "articles/:articleID",
            element: <Articles />,
          },
        ],
      },
    ],
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
  },
]);

export default router;
