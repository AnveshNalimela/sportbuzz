import React from "react";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-sky-500">
      <div className="flex items-center justify-center">
        <img src={logo} alt="Sportbuzz Logo" className="h-12 w-12 mr-2" />
        <h1 className="text-4xl  text-white font-bold">SportBuzz</h1>
      </div>
      <div>
        <button className="bg-sky-800 text-white px-4 py-2 rounded-lg mr-4">
          Sign In
        </button>
        <button className="bg-sky-800 text-white px-4 py-2 rounded-lg">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Header;
