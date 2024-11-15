import express from "express";
import { getSuggestedAreas } from "../controllers/recommendation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Define the route for getting suggested areas
router.post("/suggest-areas", authMiddleware, getSuggestedAreas);

export default router;
