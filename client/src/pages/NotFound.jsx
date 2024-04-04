import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-4 focus:outline-none focus:shadow-outline mt-5"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
