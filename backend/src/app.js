import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./models/user.model.js";
import Places from "./models/places.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "./middlewares/auth.middleware.js";
import { TravelDetails } from "./models/user.travellingDetails.model.js";
import { getCoordinates, haversineDistance } from "./utils/osmCoordinates.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.post("/api/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.send({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "email already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  // console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({ status: "error", userToken: false });
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign({ email: user.email, name: user.name }, "secret123");
    return res.json({ status: "ok", userToken: token });
  } else {
    return res.json({ status: "error", userToken: false });
  }
});

app.get("/api/user", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    const decode = jwt.verify(token, "secret123");
    const email = decode.email;
    const user = await User.findOne({ email: email });

    res.send({ status: "ok", user: user });
  } catch (error) {
    console.log("invalid token ", error);
    res.send({ status: "error", error: "invalid token" });
  }
});

app.get("/api/places", async (req, res) => {
  try {
    const places = await Places.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/userprofile", authMiddleware, async (req, res) => {
  const userEmail = req.email; // Extract the email from the token
  try {
    const user = await User.findOne({ email: userEmail }); // Fetch user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Handle case where user does not exist
    }
    console.log(user, "is the user");
    res.json(user); // Send the user data directly
  } catch (error) {
    console.error("Error fetching user:", error); // Log any error
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
});

app.post("/api/usertravel", authMiddleware, async (req, res) => {
  const { state, city, area, date, time } = req.body;
  const travelDateTime = new Date(`${date}T${time}:00`);
  console.log(req.body);
  const userEmail = req.email; // Extracted email from token by middleware
  const user = await User.findOne({ email: userEmail });
  console.log(userEmail);
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDestination = {
      state,
      city,
      area,
      travelDate: date,
      travelTime: travelDateTime,
    };
    console.log("checker 1");
    let travelDetails = await TravelDetails.findOne({ userId: user._id });

    if (travelDetails) {
      console.log("ii 1");
      // const destinations = travelDetails.destinations;
      const isDuplicate = travelDetails.destinations.some((destination) => {
        // return lagana jaruri hai
        return (
          destination.state === state &&
          destination.city === city &&
          destination.area === area &&
          destination.travelDate === date &&
          destination.travelTime.getTime() === travelDateTime.getTime()
        );
        // destination.travelTime === travelTime;
      });
      console.log(isDuplicate);
      if (isDuplicate) {
        console.log("treavel details already exists");
        return res
          .status(409)
          .json({ message: "Travel Details already exists" });
      } else {
        travelDetails.destinations.push(newDestination);
      }
    } else {
      travelDetails = new TravelDetails({
        userId: user._id, // Use the found user's id as the schema has reference to the User Schema and it can be refered with the _id only.
        destinations: [newDestination],
      });
    }

    await travelDetails.save();
    console.log("user details saved");
  } catch (error) {
    console.error("Error saving travel details:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }

  const timeWindow = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  console.log(travelDateTime);

  console.log(new Date(travelDateTime - timeWindow));
  let potentialMatches = [];
  try {
    potentialMatches = await TravelDetails.find({
      userId: { $ne: user._id },
      destinations: {
        $elemMatch: {
          state,
          city,
          travelDate: date,
          travelTime: {
            $gte: new Date(travelDateTime - timeWindow),
            $lte: new Date(travelDateTime + timeWindow),
          },
        },
      },
    }).populate("userId", "name email"); // Optionally populate the user's name and email
    console.log("the potential matches are ", potentialMatches);
    if (potentialMatches.length === 0) {
      console.log("no buddy found");
      // return res
      //   .status(404)
      //   .json({ message: "No matching travel partners found" });
    }
    // return res.json(potentialMatches);
  } catch (error) {
    console.log("error finding the travel buddy", error);
    return res.json({ message: " error in finding the travel buddy" });
  }

  (async () => {
    try {
      // Return early if no potential matches
      // if (potentialMatches.length === 0) return;

      let currentUsersCoordinates = await getCoordinates(area, city, state);
      console.log(currentUsersCoordinates);

      const userPointsArray = [];

      for (const match of potentialMatches) {
        console.log("Processing match:", match.userId.name);
        let destinationsWithPoints = [];

        for (const matchDestination of match.destinations) {
          console.log("Processing destination:", matchDestination);

          if (
            matchDestination.state === state &&
            matchDestination.city === city
          ) {
            const timeDiff =
              120 -
              Math.abs(new Date(matchDestination.travelTime) - travelDateTime) /
                60000;

            let matchUsersCoordinates = await getCoordinates(
              matchDestination.area,
              matchDestination.city,
              matchDestination.state
            );

            const distance = haversineDistance(
              currentUsersCoordinates,
              matchUsersCoordinates
            );
            console.log(`Distance to ${matchDestination.area}: ${distance} km`);

            let distancePoints = distance === 0 ? 25 : (45 / distance) * 20;

            destinationsWithPoints.push({
              state: matchDestination.state,
              city: matchDestination.city,
              area: matchDestination.area,
              travelDate: matchDestination.travelDate,
              travelTime: matchDestination.travelTime,
              distancePoints: distancePoints,
              points: timeDiff,
              totalPoints: distancePoints + timeDiff,
            });
          }
        }

        if (destinationsWithPoints.length > 0) {
          userPointsArray.push({
            userId: match.userId,
            destinations: destinationsWithPoints,
          });
        }
      }

      // Log the results
      for (const matchingUser of userPointsArray) {
        console.log("Compatible user:", matchingUser.userId.name);
        for (const destination of matchingUser.destinations) {
          console.log(
            destination.points,
            destination.travelTime,
            destination.distancePoints,
            destination.totalPoints
          );
        }
      }
      let topUser = null;
      let topUserDestinations = null;
      let highestPoints = 0;
      for (const matchingUser of userPointsArray) {
        for (const destinationOfUser of matchingUser.destinations) {
          if (destinationOfUser.totalPoints >= highestPoints) {
            topUser = matchingUser.userId;
            topUserDestinations = destinationOfUser;
            highestPoints = destinationOfUser.totalPoints;
          }
        }
      }
      console.log("matching user with most points", topUser);
      if (topUser === null) {
        console.log("NO Travel Buddy Found");
        // return res.status(404).json({ message: "no travel buddy found" });
        return res.json({ topUser });
        // return res
        //   .status(404)
        //   .json({ message: "No matching travel partners found" });
      } else {
        return res.json({
          name: topUser.name,
          email: topUser.email,
          destination: topUserDestinations,
        });
      }
    } catch (error) {
      console.log("Error in giving points to the potential matches:", error);
    }
  })();
});

app.post("/api/findbuddy", authMiddleware, async (req, res) => {
  const { state, city, area, date, time } = req.body;
  const travelDateTime = new Date(time);
  console.log(time);
  console.log(req.body);
  const userEmail = req.email; // Extracted email from token by middleware
  const user = await User.findOne({ email: userEmail });
  console.log(userEmail);
  const timeWindow = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  // console.log(time - timeWindow);
  // console.log(new Date(time - timeWindow));
  // console.log(travelDateTime - timeWindow);
  // console.log(new Date(travelDateTime - timeWindow));

  let potentialMatches = [];
  try {
    potentialMatches = await TravelDetails.find({
      userId: { $ne: user._id },
      destinations: {
        $elemMatch: {
          state,
          city,
          travelDate: date,
          travelTime: {
            $gte: new Date(travelDateTime - timeWindow),
            $lte: new Date(travelDateTime + timeWindow),
          },
        },
      },
    }).populate("userId", "name email"); // Optionally populate the user's name and email
    console.log("the potential matches are ", potentialMatches);
    if (potentialMatches.length === 0) {
      console.log("no buddy found");
      // return res
      //   .status(404)
      //   .json({ message: "No matching travel partners found" });
    }
    // return res.json(potentialMatches);
  } catch (error) {
    console.log("error finding the travel buddy", error);
    return res.json({ message: " error in finding the travel buddy" });
  }

  (async () => {
    try {
      // Return early if no potential matches
      // if (potentialMatches.length === 0) return;

      let currentUsersCoordinates = await getCoordinates(area, city, state);
      console.log(currentUsersCoordinates);

      const userPointsArray = [];

      for (const match of potentialMatches) {
        console.log("Processing match:", match.userId.name);
        let destinationsWithPoints = [];

        for (const matchDestination of match.destinations) {
          console.log("Processing destination:", matchDestination);

          if (
            matchDestination.state === state &&
            matchDestination.city === city
          ) {
            const timeDiff =
              120 -
              Math.abs(new Date(matchDestination.travelTime) - travelDateTime) /
                60000;

            let matchUsersCoordinates = await getCoordinates(
              matchDestination.area,
              matchDestination.city,
              matchDestination.state
            );

            const distance = haversineDistance(
              currentUsersCoordinates,
              matchUsersCoordinates
            );
            console.log(`Distance to ${matchDestination.area}: ${distance} km`);

            let distancePoints = distance === 0 ? 25 : (45 / distance) * 20;

            destinationsWithPoints.push({
              state: matchDestination.state,
              city: matchDestination.city,
              area: matchDestination.area,
              travelDate: matchDestination.travelDate,
              travelTime: matchDestination.travelTime,
              distancePoints: distancePoints,
              points: timeDiff,
              totalPoints: distancePoints + timeDiff,
            });
          }
        }

        if (destinationsWithPoints.length > 0) {
          userPointsArray.push({
            userId: match.userId,
            destinations: destinationsWithPoints,
          });
        }
      }

      // Log the results
      for (const matchingUser of userPointsArray) {
        console.log("Compatible user:", matchingUser.userId.name);
        for (const destination of matchingUser.destinations) {
          console.log(
            destination.points,
            destination.travelTime,
            destination.distancePoints,
            destination.totalPoints
          );
        }
      }
      let topUser = null;
      let topUserDestinations = null;
      let highestPoints = 0;
      for (const matchingUser of userPointsArray) {
        for (const destinationOfUser of matchingUser.destinations) {
          if (destinationOfUser.totalPoints >= highestPoints) {
            topUser = matchingUser.userId;
            topUserDestinations = destinationOfUser;
            highestPoints = destinationOfUser.totalPoints;
          }
        }
      }
      console.log("matching user with most points", topUser);
      if (topUser === null) {
        console.log("NO Travel Buddy Found");
        // return res.status(404).json({ message: "no travel buddy found" });
        return res.json({ topUser });
        // return res
        //   .status(404)
        //   .json({ message: "No matching travel partners found" });
      } else {
        return res.json({
          name: topUser.name,
          email: topUser.email,
          destination: topUserDestinations,
        });
      }
    } catch (error) {
      console.log("Error in giving points to the potential matches:", error);
    }
  })();
});

app.get("/api/userTravelDetails", authMiddleware, async (req, res) => {
  const userEmail = await req.email;
  const user = await User.findOne({ email: userEmail });
  const userTravelDetails = await TravelDetails.findOne({ userId: user._id });
  res.json(userTravelDetails.destinations);
});

app.get("/", (req, res) => {
  res.send("welcome to TraveBuddy to find the perect partner for travelling");
});
app.get("/login", (req, res) => {
  res.send();
});
export { app };
