import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);

  return <Navigate to="/" />;
};

export default LogOut;
