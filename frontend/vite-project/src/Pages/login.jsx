// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Create user object to send to backend
//     const userData = {
//       email,
//       password,
//     };
//     try {
//       const response = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const result = await response.json();

//       if (result.userToken) {
//         console.log(result.userToken);
//         localStorage.setItem("token", result.userToken);
//         navigate("/travellingdestinations");
//         // Redirect to login or another page
//       } else {
//         alert("password/email incorrect");
//         console.error("Login failed - Password/Email is incorrect", result);
//       }
//     } catch (error) {
//       console.error("Error during Login", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Login to Travel Buddy
//         </h2>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="mb-4 flex justify-between items-center">
//             <div className="flex items-center">
//               <input type="checkbox" id="remember-me" className="mr-2" />
//               <label htmlFor="remember-me" className="text-sm text-gray-700">
//                 Remember me
//               </label>
//             </div>
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("https://travelbuddy-as87.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (result.userToken) {
        localStorage.setItem("token", result.userToken);
        navigate("/travellingdestinations");
      } else {
        alert("Password/Email incorrect");
      }
    } catch (error) {
      console.error("Error during Login", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center  bg-blue-50"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?travel,adventure')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to plan your next adventure with Travel Buddy
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
