import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layout/account";
import HomeLayout from "../layout/home";
import Articles from "../pages/Articles";
import Home from "../pages/home";
import Container from "../pages/home/Container";
import Logout from "../pages/logout";

import { ArticleProvider } from "../context/article/context";
import { MatchProvider } from "../context/match/context";
import Match from "../pages/match";
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
      { index: true, element: <Navigate to="/home/index" replace /> },
      {
        path: "index",
        element: <Container />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "matches/:matchID",
            element: (
              <MatchProvider>
                <Match />
              </MatchProvider>
            ),
          },
          {
            path: "articles/:articleID",
            element: (
              <ArticleProvider>
                <Articles />
              </ArticleProvider>
            ),
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
