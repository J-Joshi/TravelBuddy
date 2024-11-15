import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MoodRecommendation = () => {
  const [moodDescription, setMoodDescription] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [error, setError] = useState("");

  const [places, setPlaces] = useState([]);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [areaSuggestions, setAreaSuggestions] = useState([]);

  // Fetch places data from the backend when the component mounts
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Failed to fetch places data:", error);
      }
    };
    fetchPlaces();
  }, []);

  // Handle state input change and filter suggestions
  const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value);
    setStateSuggestions(
      places
        .filter((place) =>
          place.state.toLowerCase().includes(value.toLowerCase())
        )
        .map((place) => place.state)
    );
    setCity(""); // Reset city and area on state change
    setArea("");
    setCitySuggestions([]);
    setAreaSuggestions([]);
  };

  // Handle city input change and filter suggestions
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    const selectedState = places.find((place) => place.state === state);
    if (selectedState) {
      setCitySuggestions(
        selectedState.city.toLowerCase().includes(value.toLowerCase())
          ? [selectedState.city]
          : []
      );
    } else {
      setCitySuggestions([]);
    }
    setArea("");
    setAreaSuggestions([]);
  };

  // Handle area input change and filter suggestions
  const handleAreaChange = (e) => {
    const value = e.target.value;
    setArea(value);
    const selectedCity = places.find((place) => place.city === city);
    if (selectedCity) {
      setAreaSuggestions(
        selectedCity.areas.filter((area) =>
          area.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setAreaSuggestions([]);
    }
  };

  // Function to select a state suggestion
  const handleSelectStateSuggestion = (suggestion) => {
    setState(suggestion);
    setStateSuggestions([]);
    setCity("");
    setArea("");
    setCitySuggestions([]);
    setAreaSuggestions([]);
  };

  // Function to select a city suggestion
  const handleSelectCitySuggestion = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
    setArea("");
    setAreaSuggestions([]);
  };

  // Function to select an area suggestion
  const handleSelectAreaSuggestion = (suggestion) => {
    setArea(suggestion);
    setAreaSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Step 1: Send the mood description to the Flask ML model
      const token = localStorage.getItem("token");
      console.log("mood dekhne se pahle");
      const moodResponse = await fetch(
        "http://ec2-3-27-66-140.ap-southeast-2.compute.amazonaws.com:8080//analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: moodDescription }),
        }
      );
      console.log("mood ke baad");

      if (!moodResponse.ok) {
        console.log("no mood");
        throw new Error("Failed to analyze mood.");
      }

      const moodData = await moodResponse.json();
      const { mood } = moodData; // Extract the mood from the response
      console.log(`mood ha => ${mood}`);
      // Step 2: Send the mood, state, city, and area to your Node.js backend
      const placesResponse = await fetch(
        "http://localhost:8000/api/suggest-areas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            state,
            city,
            area,
            mood,
          }),
        }
      );

      if (!placesResponse.ok) {
        console.log("places recommend nahi ho rahi backend se");
        throw new Error("Failed to fetch recommendations.");
      }

      const placesData = await placesResponse.json();
      setRecommendedPlaces(placesData.nearestAreas);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(err);
    }
  };
  const navigate = useNavigate();
  const handleNavigate = (place) => {
    navigate("/travellingdestinations", {
      state: { state: place.state, city: place.city, area: place.area },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg md:max-w-2xl bg-white rounded-lg shadow-lg p-8 md:p-10">
        {" "}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Find Places Based on Your Mood
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mood Description
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe your mood..."
              value={moodDescription}
              onChange={(e) => setMoodDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your state"
              value={state}
              onChange={handleStateChange}
              required
            />
            {stateSuggestions.length > 0 && (
              <ul className="border border-gray-300 mt-1 rounded bg-white">
                {stateSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectStateSuggestion(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your city"
              value={city}
              onChange={handleCityChange}
              required
            />
            {citySuggestions.length > 0 && (
              <ul className="border border-gray-300 mt-1 rounded bg-white">
                {citySuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectCitySuggestion(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your area"
              value={area}
              onChange={handleAreaChange}
              required
            />
            {areaSuggestions.length > 0 && (
              <ul className="border border-gray-300 mt-1 rounded bg-white">
                {areaSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectAreaSuggestion(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Get Recommendations
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {recommendedPlaces.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Recommended Places
            </h2>
            <ul className="space-y-2">
              {recommendedPlaces.map((place, index) => (
                <li
                  key={index}
                  className="bg-gray-200 p-3 rounded-md text-center shadow-sm"
                >
                  {place.area} - {place.distance.toFixed(2)} km away
                  <button
                    onClick={() => handleNavigate(place)}
                    className="ml-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    View Matching Buddy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodRecommendation;
