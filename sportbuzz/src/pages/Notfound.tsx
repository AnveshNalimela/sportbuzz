// src/pages/NotFound.tsx

import React from "react";
import { Link } from "react-router-dom";

const Notfound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go to Home Page
      </Link>
    </div>
  );
};

export default Notfound;
