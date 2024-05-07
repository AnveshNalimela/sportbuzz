import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountLayout from "../layout/account";
import HomeLayout from "../layout/home";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
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
