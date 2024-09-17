import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Travel Buddy</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-gray-600 hover:text-blue-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
