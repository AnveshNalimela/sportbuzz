import React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const AccountLayout = () => {
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-8xl py-6 sm:px-6 lg:px-10">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
