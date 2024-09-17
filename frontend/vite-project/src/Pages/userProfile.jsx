import React from "react";
import Navbar from "./components/navbar"; // Assuming you have a Navbar component
import Footer from "./components/footer"; // Assuming you have a Footer component

const UserProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Header / Navbar */}
      <main className="flex-grow bg-blue-50 py-10">
        <div className="container mx-auto max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <img
              src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
              alt="User Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-600">johndoe@example.com</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
              <p className="text-gray-600">
                Hi! I'm John, a travel enthusiast who loves to explore new
                places and meet new people. I enjoy hiking, photography, and
                trying new cuisines.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">Location</h3>
              <p className="text-gray-600">New York, USA</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Upcoming Trips
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Trip to Bali - October 2024</li>
                <li>Weekend in Paris - December 2024</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default UserProfilePage;
