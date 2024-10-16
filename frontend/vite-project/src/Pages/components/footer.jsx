import React from "react";

const Navbar = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} TravelBuddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Navbar;
