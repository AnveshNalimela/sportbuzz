import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import React from "react";

const HomeLayout = () => {
  
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
