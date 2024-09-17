import React from "react";
import Navbar from "./components/navbar.jsx"; // Import Navbar component
import Footer from "./components/footer.jsx"; // Import Footer component
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar component */}
      {/* Hero Section */}
      <section className="flex-grow bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Travel Buddy
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We offer amazing services to help you achieve your goals.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/signup">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-600 text-white py-2 px-6 rounded-full shadow hover:bg-gray-700">
                Log In
              </button>
            </Link>
          </div>
          <Link to="/learnmore">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow hover:bg-blue-700">
              Learn More
            </button>
          </Link>
        </div>
      </section>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default HomePage;
