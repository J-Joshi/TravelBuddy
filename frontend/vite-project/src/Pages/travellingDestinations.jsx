import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";

const TravelDetailsPage = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [places, setPlaces] = useState([]);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const destination = { date, time, state, city, area };
    console.log(destination);
    try {
      const response = await fetch("http://localhost:8000/api/usertravel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
      });
      const result = await response.json();
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
    } catch (error) {
      console.log(error);
    }

    // have to send this data to the matching algorithm and navigate the user to the page showing the travel Buddies.
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:8000/api/places");
      const data = await response.json();
      setPlaces(data);
    };
    fetchPlaces();
  }, []);

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
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    const selectedState = places.find((place) => place.state === state);

    if (selectedState && selectedState.city) {
      // Ensure city is a string before calling toLowerCase()
      const cityName = selectedState.city.toLowerCase();
      setCitySuggestions(
        cityName.includes(value.toLowerCase()) ? [selectedState.city] : []
      );
    } else {
      // Reset suggestions if selectedState or selectedState.city is undefined
      setCitySuggestions([]);
    }
  };

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
    }
  };

  const handleSelectStateSuggestion = (suggestion) => {
    setState(suggestion);
    setStateSuggestions([]);
    setCity(""); // Reset city and area on state change
    setArea("");
  };

  const handleSelectCitySuggestion = (suggestion) => {
    setCity(suggestion);
    setCitySuggestions([]);
    setArea(""); // Reset area on city change
  };

  const handleSelectAreaSuggestion = (suggestion) => {
    setArea(suggestion);
    setAreaSuggestions([]);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured-full/travel-ibk7fgrvtvhs7qzg.jpg')",
      }}
    >
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-h-screen bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Enter Travel Details
          </h2>

          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded"
            />
          </div>

          {/* Time Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded"
            />
          </div>

          {/* State Input */}
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              value={state}
              onChange={handleStateChange}
              className="w-full border border-gray-300 px-4 py-3 rounded"
              placeholder="Type state..."
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

          {/* City Input */}
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              className="w-full border border-gray-300 px-4 py-3 rounded"
              placeholder="Type city..."
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

          {/* Area Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Area</label>
            <input
              type="text"
              value={area}
              onChange={handleAreaChange}
              className="w-full border border-gray-300 px-4 py-3 rounded"
              placeholder="Type area..."
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-300"
            >
              Find Your Travelling Buddy
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TravelDetailsPage;
