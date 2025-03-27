"use strict";

import express from "express";
import logger from "./utils/logger.js";
import start from "./controllers/start.js";
import fs from "fs";

const router = express.Router();

// ---------------------------------------------
// Home route
// ---------------------------------------------
router.get("/", start.createView);

// ---------------------------------------------
// Page 2 route
// ---------------------------------------------
router.get("/page2", (req, res) => {
  res.render("page2");
});

// ---------------------------------------------
// Page 4 routes (submissions form)
// ---------------------------------------------
const submissionsFile = "./data/submissions.json";
let submissions = [];

// Load existing submissions if file exists
if (fs.existsSync(submissionsFile)) {
  const fileData = fs.readFileSync(submissionsFile, "utf8");
  submissions = JSON.parse(fileData).submissions;
}

// Render page4 with stored submissions
router.get("/page4", (req, res) => {
  res.render("page4", { submissions });
});

// Handle form submission for page4
router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  // Prevent empty submissions
  if (!name || !email || !message) {
    return res.redirect("/page4");
  }

  // Add new entry to submissions array
  const newEntry = { name, email, message };
  submissions.push(newEntry);

  // Save updated data to file
  fs.writeFileSync(
    submissionsFile,
    JSON.stringify({ submissions }, null, 2)
  );

  // Reload page to show new entry
  res.redirect("/page4");
});

// ---------------------------------------------
// Page 5 route (cars data)
// ---------------------------------------------
const carsData = JSON.parse(fs.readFileSync("./data/cars.json", "utf8"));

router.get("/page5", (req, res) => {
  console.log("Cars Data:", carsData); // For debugging
  // If your JSON is { "brands": [ ... ] }, use:
  res.render("page5", { brands: carsData.brands });

  // If instead your JSON is { "cars": [ ... ] }, use:
  // res.render("page5", { cars: carsData.cars });

  // Or if it's just an array, do:
  // res.render("page5", { cars: carsData });
});

// ---------------------------------------------
// Page 3 routes (mechanic reviews)
// ---------------------------------------------
const mechanicsFile = "./data/mechanics.json";

// Helper function to load reviews
const loadReviews = () => {
  const data = fs.readFileSync(mechanicsFile, "utf8");
  return JSON.parse(data).reviews;
};

// Display page3 with mechanic reviews
router.get("/page3", (req, res) => {
  const reviews = loadReviews();
  res.render("page3", { reviews });
});

// Handle new review submissions
router.post("/submit-review", (req, res) => {
  const { name, location, rating, review } = req.body;
  let reviews = loadReviews();

  // Add new review
  reviews.push({ name, location, rating, review });

  // Save to file
  fs.writeFileSync(
    mechanicsFile,
    JSON.stringify({ reviews }, null, 2)
  );

  // Refresh page
  res.redirect("/page3");
});

// ---------------------------------------------
// Page 6 route (about data)
// ---------------------------------------------
const aboutData = JSON.parse(fs.readFileSync("./data/about.json", "utf8"));

// Use /page6 instead of / to avoid conflict with home route
router.get("/page6", (req, res) => {
  res.render("page6", { about: aboutData });
});

// ---------------------------------------------
// Export the router
// ---------------------------------------------
export default router;
