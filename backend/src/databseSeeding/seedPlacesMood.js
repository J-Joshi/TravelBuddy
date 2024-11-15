import mongoose from "mongoose";
import Places from "../models/places.model.js"; // Adjust the path as needed
import Mood from "../models/placesMood.model.js"; // Adjust the path as needed

export const seedMoodsForAreas = async () => {
  // Check if there are any existing moods in the collection
  const existingMoods = await Mood.countDocuments({});
  if (existingMoods > 0) {
    console.log("Moods already exist in the database. Skipping seed.");
    return;
  }

  try {
    // Fetch all places from the database
    const places = await Places.find();

    // Prepare an array to hold all mood documents
    const moodDocuments = [];

    // Define mood categories to assign
    const moodCategories = ["happy", "calm", "adventurous", "sad", "neutral"];

    // Iterate over each place in the database
    places.forEach((place) => {
      // Iterate over each area in the place
      place.areas.forEach((area, index) => {
        // Assign a mood to the area in a round-robin fashion
        const mood = moodCategories[index % moodCategories.length];

        // Create a mood document for each area
        moodDocuments.push({
          mood: mood,
          place: place._id, // Reference to the Places document
          area: area, // The specific area within the city
        });
      });
    });

    // Insert all mood documents into the database
    await Mood.insertMany(moodDocuments);
    console.log("Moods for all areas in the database seeded successfully!");
  } catch (err) {
    console.error("Error seeding moods for all areas:", err);
  }
};
