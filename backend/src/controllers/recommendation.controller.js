import Places from "../models/places.model.js";
import Mood from "../models/placesMood.model.js";
import { getCoordinates, haversineDistance } from "../utils/osmCoordinates.js";

export const getSuggestedAreas = async (req, res) => {
  try {
    const { state, city, area, mood } = req.body; // Extract user's state, city, area, and mood

    // Get the user's coordinates using the provided state, city, and area
    const userCoordinates = await getCoordinates(state, city, area);

    // Find the place document for the given city
    const place = await Places.findOne({ city });
    if (!place) {
      return res
        .status(404)
        .json({ message: "City not found in the database." });
    }

    // Find all mood documents that match the mood and are associated with the same city
    const matchingMoods = await Mood.find({
      mood,
      place: place._id,
    }).populate("place");

    // Calculate distances for all areas and sort to find the nearest 5
    const areasWithDistances = await Promise.all(
      matchingMoods.map(async (moodDoc) => {
        try {
          // Get coordinates for the area
          const areaCoordinates = await getCoordinates(
            place.state,
            place.city,
            moodDoc.area
          );

          // Calculate the distance from the user's location
          const distance = haversineDistance(userCoordinates, areaCoordinates);

          return {
            state: place.state,
            city: place.city,
            area: moodDoc.area,
            distance,
          };
        } catch (error) {
          console.error(
            `Error getting coordinates for ${moodDoc.area}:`,
            error
          );
          return null; // Return null if there is an error fetching coordinates
        }
      })
    );

    // Filter out any null values (areas where coordinates couldn't be found)
    const validAreas = areasWithDistances.filter((area) => area !== null);

    // Sort areas by distance (ascending) and get the top 5
    validAreas.sort((a, b) => a.distance - b.distance);
    const nearestAreas = validAreas.slice(0, 5);

    // Return the nearest areas
    res.json({
      userLocation: { state, city, area },
      mood,
      nearestAreas,
    });
  } catch (error) {
    console.error("Error fetching suggested areas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
