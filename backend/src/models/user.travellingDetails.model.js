import mongoose from "mongoose";
import { User } from "./user.model.js";

const destinationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  travelDate: {
    type: String,
    required: true,
  },
  travelTime: {
    type: Date,
    required: true,
  },
});

const travelDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  destinations: [destinationSchema], // Array of destinations
});

export const TravelDetails = mongoose.model(
  "TravelDetails",
  travelDetailsSchema
);
