import React from "react";
import Navbar from "./components/navbar.jsx"; // Import Navbar component
import Footer from "./components/footer.jsx"; // Import Footer component

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar component */}
      <main className="flex-grow flex items-center justify-center">
        <p className="text-gray-600 text-lg">This is an empty page.</p>
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default ServicesPage;
