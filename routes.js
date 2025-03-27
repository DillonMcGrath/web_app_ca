"use strict";

import express from "express";
import fs from "fs";
import start from "./controllers/start.js"; // Home controller

const router = express.Router();

// ---------------------
// Home Route
// ---------------------
// Renders the home page using the start controller.
router.get("/", start.createView);

// ---------------------
// Page 2 Route
// ---------------------
// Renders a simple page2 view.
router.get("/page2", (req, res) => {
  res.render("page2");
});

// ---------------------
// Page 3 Route (Mechanic Reviews)
// ---------------------
// Helper function to load mechanic reviews.
const mechanicsFile = "./data/mechanics.json";
const loadReviews = () => {
  const data = fs.readFileSync(mechanicsFile, "utf8");
  return JSON.parse(data).reviews;
};

// GET: Renders page3 with reviews.
router.get("/page3", (req, res) => {
  const reviews = loadReviews();
  res.render("page3", { reviews });
});

// POST: Handles new review submission and saves to file.
router.post("/submit-review", (req, res) => {
  const { name, location, rating, review } = req.body;
  let reviews = loadReviews();
  reviews.push({ name, location, rating, review });
  fs.writeFileSync(mechanicsFile, JSON.stringify({ reviews }, null, 2));
  res.redirect("/page3");
});

// ---------------------
// Page 4 Route (Submissions)
// ---------------------
// Load submissions if the file exists.
const submissionsFile = "./data/submissions.json";
let submissions = [];
if (fs.existsSync(submissionsFile)) {
  submissions = JSON.parse(fs.readFileSync(submissionsFile, "utf8")).submissions;
}

// GET: Renders page4 with stored submissions.
router.get("/page4", (req, res) => {
  res.render("page4", { submissions });
});

// POST: Handles form submission and saves a new submission.
router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.redirect("/page4"); // Skip empty submissions
  }
  submissions.push({ name, email, message });
  fs.writeFileSync(submissionsFile, JSON.stringify({ submissions }, null, 2));
  res.redirect("/page4");
});

// ---------------------
// Page 5 Route (Cars Data with Filters)
// ---------------------
// GET: Reads cars.json, applies filters (by year/model), and renders page5.
router.get("/page5", (req, res) => {
  const { year, model } = req.query;
  const carsData = JSON.parse(fs.readFileSync("./data/cars.json", "utf8"));
  
  // Filter brands' models based on query parameters.
  let filteredBrands = carsData.brands.map((brand) => {
    let filteredModels = brand.models;
    if (year && year.trim() !== "") {
      filteredModels = filteredModels.filter((m) => String(m.year) === year);
    }
    if (model && model.trim() !== "") {
      filteredModels = filteredModels.filter((m) =>
        m.name.toLowerCase().includes(model.toLowerCase())
      );
    }
    return { ...brand, models: filteredModels };
  });
  // Remove any brand with no models after filtering.
  filteredBrands = filteredBrands.filter((b) => b.models.length > 0);
  
  res.render("page5", {
    brands: filteredBrands,
    selectedYear: year || "",
    selectedModel: model || ""
  });
});

// ---------------------
// Page 6 Route (About Page)
// ---------------------
// Reads about.json and renders the about page.
const aboutData = JSON.parse(fs.readFileSync("./data/about.json", "utf8"));
router.get("/page6", (req, res) => {
  res.render("page6", { about: aboutData });
});

export default router;
