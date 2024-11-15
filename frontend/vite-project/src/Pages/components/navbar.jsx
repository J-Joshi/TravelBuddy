import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the JWT token is present in local storage
  const token = localStorage.getItem("token"); // Assuming 'jwtToken' is the key used for storing the JWT
  const isLoggedIn = !!token; // If token exists, user is logged in

  // Optionally, decode JWT to get user info (if it's encoded in the payload)
  // Assuming user data is stored in localStorage
  const getUser = async () => {
    const response = await fetch("http://localhost:8000/api/userprofile", {
      headers: {
        Authorization: `Bearer ${token}`, // Add a space here
      },
    });
    const user = await response.json();
    if (user) {
      navigate("/userProfile", { state: { user: user } });
    } else {
      console.log("user not found");
    }
  };
  const getMood = async () => {
    navigate("/moodrecommendation");
  };

  const handleLogout = () => {
    // Remove token and user info on logout
    localStorage.removeItem("token");
    // localStorage.removeItem("userProfile");
    navigate("/login"); // Redirect to login page after logging out
  };

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
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </li>

          {isLoggedIn ? (
            // Show Profile Link or Info when the user is logged in
            <>
              <li>
                <button
                  onClick={getUser}
                  className="text-gray-600 hover:text-blue-600 font-bold"
                >
                  {"Profile"} {/* Display user's name if available */}
                </button>
              </li>
              <li>
                <button
                  onClick={getMood}
                  className="text-gray-600 hover:text-blue-600 font-bold"
                >
                  Mood Safari
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout} // Trigger logout
                  className="text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Show Login/Register link when the user is not logged in
            <li>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
