import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
// import express from "express";
import connectDB from "./db/index.js";
import { seedPlaces } from "./databseSeeding/placeSeeding.js";
import { seedMoodsForAreas } from "./databseSeeding/seedPlacesMood.js";

// const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed ", err);
  });
// seeding of the places
seedPlaces();
// seeding of the mood to places
seedMoodsForAreas();
// app.listen(process.env.PORT , () =>{
//     console.log(`App is listening on PORT ${process.env.PORT}`)
// })
