import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  // {
  //   path: "/signin",
  //   element: <Signin />,
  // },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  // {
  //   path: "/logout",
  //   element:<Home/>
  // },
  // {
  //   path: "account",
  //   element: (
  //     <ProtectedRoute>
  //     <Home/>
  //     </ProtectedRoute>
  //   ),
  //   ErrorBoundary: () => <>Failed to load the page</>,
  // }
  // {
  //   path: "notfound",
  //   element:<Home/>
  // },
]);
export default router;
