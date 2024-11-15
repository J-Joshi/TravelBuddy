import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
    enum: ["happy", "calm", "adventurous", "sad", "neutral"], // Define your mood categories
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "places", // Reference to the Places model
    required: true,
  },
  area: {
    type: String,
    required: true, // The specific area within the city, kyuki har araea ka different mood hoga , to seeding ma asaan padega
  },
});

const Mood = mongoose.model("mood", moodSchema);

export default Mood;
