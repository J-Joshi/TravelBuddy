// App.jsx

import React from "react";
import HomePage from "./Pages/home.jsx"; // Assuming 'home.jsx' is in a 'Pages' folder
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signUp";
import UserProfilePage from "./Pages/userProfile";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
