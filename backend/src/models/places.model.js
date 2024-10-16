import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  areas: [
    {
      type: String,
      required: true,
    },
  ],
});

const Places = mongoose.model("places", placesSchema);

export default Places;
