import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layout/account";
import HomeLayout from "../layout/home";

import Container from "../pages/home/Container";
import Logout from "../pages/logout";

import { ArticleProvider } from "../context/article/context";
import { MatchProvider } from "../context/match/context";
import { SportsProvider } from "../context/sports/context";
import { TeamsProvider } from "../context/teams/context";

import Notfound from "../pages/Notfound";
import Profile from "../pages/profile";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ProtectedRoute from "./ProtectedRoute";
const Home = lazy(() => import("../pages/home"));
const Articles = lazy(() => import("../pages/Articles"));
const Match = lazy(() => import("../pages/match"));
const Account = lazy(() => import("../pages/account"));
const AContainer = lazy(() => import("../pages/account/Acontainer"));
// Get the token from local storage
const token = localStorage.getItem("authToken");
const router = createBrowserRouter([
  {
    path: "/",
    element: token ? (
      <Navigate to="/home" replace />
    ) : (
      <Navigate to="/account" replace />
    ),
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
    ErrorBoundary: () => <>Failed to load the page</>,
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
        <SportsProvider>
          <TeamsProvider>
            <AccountLayout />
          </TeamsProvider>
        </SportsProvider>
      </ProtectedRoute>
    ),
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      { index: true, element: <Navigate to="/account/dashboard" replace /> },
      {
        path: "dashboard",
        element: <AContainer />,
        children: [
          { index: true, element: <Account /> },
          {
            path: "profile",
            element: <Profile />,
          },
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
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
