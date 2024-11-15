import React from "react";
import Navbar from "./components/navbar.jsx"; // Import Navbar component
import Footer from "./components/footer.jsx"; // Import Footer component
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar /> {/* Navbar component */}
      {/* Hero Section */}
      <section className="flex-grow bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Travel Buddy
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Find your perfect travel companion and explore destinations
            together, making every journey more meaningful{" "}
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
        {/* Image Section */}
        <div className="text-center mx-auto w-full py-6">
          <p className="text-lg font-bold ">Find The Perfect Travel Buddy</p>
        </div>
        <div className="text-center py-10">
          <img
            src="https://findtravelpartnerapp.wordpress.com/wp-content/uploads/2020/09/need-to-take-care-of-when-traveling-with-your-travel-partner.jpg" // Replace this with your actual image link
            alt="Travel Destination"
            className="mx-auto w-full max-w-md h-auto border-4 border-gray-900 rounded-lg"
          />
        </div>
      </section>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default HomePage;
