import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import the CSS file
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login.jsx";
import SignupPage from "./Pages/signUp.jsx";
import AboutPage from "./Pages/about.jsx";
import LearnMorePage from "./Pages/learnMore.jsx";
import ContactPage from "./Pages/contact.jsx";
import ServicesPage from "./Pages/services.jsx";
import UserProfilePage from "./Pages/userProfile.jsx";
import TravelDetailsPage from "./Pages/travellingDestinations.jsx";
import Quote from "./Pages/quote.jsx";
import MatchedBuddy from "./Pages/matchedBuddy.jsx";
import MoodRecommendation from "./Pages/moodRecomendation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/learnmore",
    element: <LearnMorePage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/userprofile",
    element: <UserProfilePage />,
  },
  {
    path: "/travellingdestinations",
    element: <TravelDetailsPage />,
  },
  {
    path: "/quote",
    element: <Quote />,
  },
  {
    path: "/matchedbuddy",
    element: <MatchedBuddy />,
  },
  {
    path: "/moodrecommendation",
    element: <MoodRecommendation />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
