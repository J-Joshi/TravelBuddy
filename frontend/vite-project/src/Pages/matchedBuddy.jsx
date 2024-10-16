// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const MatchedBuddy = () => {
//   const location = useLocation(); // Get the state passed via navigate
//   const navigate = useNavigate();
//   const matchedBuddy = location.state?.matchedBuddy; // Extract matchedBuddy details

//   if (!matchedBuddy) {
//     // If no matched buddy found, navigate back or show a more helpful message
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold mb-4">No Travel Buddy Found</h2>
//           <p className="mb-6">
//             It seems there is no matched travel buddy available.
//           </p>
//           <button
//             onClick={() => navigate("/")} // Redirect to home or another page
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleContact = () => {
//     // Example functionality: Send email or open a chat window
//     alert(`Contact ${matchedBuddy.name} via email: ${matchedBuddy.email}`);
//   };
//   const formattedTravelTime = new Date(
//     matchedBuddy.destination.travelTime
//   ).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Matched Travel Buddy
//         </h2>
//         <div className="space-y-4">
//           <div>
//             <span className="font-semibold">Name:</span> {matchedBuddy.name}
//           </div>
//           <div>
//             <span className="font-semibold">Email:</span> {matchedBuddy.email}
//           </div>
//           <div>
//             <span className="font-semibold">Destination:</span>{" "}
//             {matchedBuddy.destination.area}
//           </div>
//           <div>
//             <span className="font-semibold">Travel Date:</span>{" "}
//             {matchedBuddy.destination.travelDate}
//           </div>
//           <div>
//             <span className="font-semibold">Travel Time:</span>{" "}
//             {formattedTravelTime}
//           </div>
//           {/* Add other details you want to show */}
//         </div>
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={handleContact} // Trigger the contact functionality
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Contact
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchedBuddy;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchedBuddy = () => {
  const location = useLocation(); // Get the state passed via navigate
  const navigate = useNavigate();
  const matchedBuddy = location.state?.matchedBuddy; // Extract matchedBuddy details

  if (!matchedBuddy || !matchedBuddy.name) {
    // Check if there is no matched buddy or if the topUser is null
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Travel Buddy Found</h2>
          <p className="mb-6">
            It seems there is no matched travel buddy available at the moment.
          </p>
          <button
            onClick={() => navigate("/userprofile")} // Redirect to profile or another page
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    // Example functionality: Send email or open a chat window
    alert(`Contact ${matchedBuddy.name} via email: ${matchedBuddy.email}`);
  };

  const formattedTravelTime = new Date(
    matchedBuddy.destination.travelTime
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Matched Travel Buddy
        </h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {matchedBuddy.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {matchedBuddy.email}
          </div>
          <div>
            <span className="font-semibold">Destination:</span>{" "}
            {matchedBuddy.destination.area}
          </div>
          <div>
            <span className="font-semibold">Travel Date:</span>{" "}
            {matchedBuddy.destination.travelDate}
          </div>
          <div>
            <span className="font-semibold">Travel Time:</span>{" "}
            {formattedTravelTime}
          </div>
          {/* Add other details you want to show */}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleContact} // Trigger the contact functionality
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchedBuddy;
