import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar"; // Assuming you have a Navbar component
import Footer from "./components/footer"; // Assuming you have a Footer component
import { useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const UserProfilePage = () => {
  const [user, setUser] = useState("");
  const [travellingDetails, setTravellingDetails] = useState([]);

  const navigate = useNavigate();

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/userprofile", {
      headers: {
        Authorization: `Bearer ${token}`, // Add a space here
      },
    });
    const result = await response.json();

    if (result) {
      console.log("user is found", result.name);
      setUser(result);
      console.log("now after rendering ", user.name);
    } else {
      console.log("user not found");
    }
    getTracvellingDetails();
  };
  const getTracvellingDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:8000/api/userTravelDetails",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (result) {
      setTravellingDetails(result);
      console.log("the travelling details are ", result);
    } else {
      console.log("error in getting the travelling details of the user.");
    }
  };
  useEffect(() => {
    if (user) {
      console.log("User after setUser:", user.name); // This will log the updated user
    }
  }, [user]); // This useEffect runs whenever the `user` state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      getUserProfile();
    }
  }, []);
  const goToTravelDetails = () => {
    navigate("/travellingdestinations"); // Navigate to travel details page
  };

  const getTravelBuddy = async (trip) => {
    const date = trip.travelDate;
    const state = trip.state;
    const city = trip.city;
    const area = trip.area;
    const time = trip.travelTime;
    const destination = { state, city, area, date, time };
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/findbuddy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(destination),
      });

      const result = await response.json();
      console.log("kkkk", result);
      if (response.status === 409) {
        // console.log("xxxxx");
        alert(result.message);
      } else if (response.status == 404) {
        alert("No travel Buddy found ");
        navigate("/userprofile");
      } else if (result) {
        // console.log(result.name, result.email, result.destination);

        navigate("/matchedbuddy", { state: { matchedBuddy: result } });
      } // Pass the result to the next page

      // const result = await response.json();
      // if (result)
      //   navigate("/matchedbuddy", { state: { matchedBuddy: result } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Header / Navbar */}
      <main className="flex-grow bg-blue-50 py-10">
        <div className="container mx-auto max-w-2xl bg-white p-10 rounded-lg shadow-lg">
          {" "}
          {/* Increased width */}
          <div className="text-center mb-6">
            <img
              src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
              alt="User Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="space-y-6">
            {/* <div>
              <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
              <p className="text-gray-600">
                Hi! I'm John, a travel enthusiast who loves to explore new
                places and meet new people. I enjoy hiking, photography, and
                trying new cuisines.
              </p>
            </div> */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Your Travelling Details
              </h2>
              {/* Check if there are any travelling details */}
              {travellingDetails.length > 0 ? (
                <ul className="list-disc list-inside">
                  {travellingDetails.map((trip, index) => (
                    <li key={index} className="mb-2">
                      <div>
                        <span className="font-semibold">State:</span>{" "}
                        {trip.state}
                      </div>
                      <div>
                        <span className="font-semibold">City:</span> {trip.city}
                      </div>
                      <div>
                        <span className="font-semibold">Area:</span> {trip.area}
                      </div>
                      <div>
                        <span className="font-semibold">Travel Date:</span>{" "}
                        {trip.travelDate}
                      </div>
                      <div>
                        <span className="font-semibold">Travel Time:</span>{" "}
                        {new Date(trip.travelTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        {/* without these hour, minute and hours it shows HH:MM:SS */}
                      </div>
                      <div className="mt-2">
                        {/* Button to view matching buddy */}
                        <button
                          onClick={() => getTravelBuddy(trip)}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        >
                          View Matching Buddy
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No travelling details available.</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={goToTravelDetails}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Enter Travel Details
            </button>
          </div>
        </div>
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default UserProfilePage;
