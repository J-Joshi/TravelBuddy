import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar.jsx"; // Import Navbar component
import Footer from "./components/footer.jsx"; // Import Footer component
import { useNavigate } from "react-router-dom";

const Quote = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");

  const populateQuote = async () => {
    try {
      const token = localStorage.getItem("token");
      const request = await fetch("http://localhost:8000/api/user", {
        // methode: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await request.json();
      if (data.status == "ok") {
        // console.log("password is :", data.user);
        setPass(data.user.password);
      } else {
        console.log(data.error);
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.log("user data fetching problem", error);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      populateQuote();
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar component */}
      <main className="flex-grow flex items-center justify-center">
        <p className="text-gray-600 text-lg">password is {pass}</p>
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default Quote;
