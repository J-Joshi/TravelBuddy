import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
// import express from "express";
import connectDB from "./db/index.js";

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

// app.listen(process.env.PORT , () =>{
//     console.log(`App is listening on PORT ${process.env.PORT}`)
// })
