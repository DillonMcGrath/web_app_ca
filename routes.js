"use strict";

import express from "express";
import fs from "fs";
import start from "./controllers/start.js"; // Home controller
import { showCarsPage } from './controllers/carController.js';


const router = express.Router();

// -----------------------------------------
// Home Route ("/")
// -----------------------------------------
router.get("/", start.createView);

// -----------------------------------------
// Page 2 Route
// -----------------------------------------
router.get("/page2", (req, res) => {
  res.render("page2");
});

// -----------------------------------------
// Page 3 Route (Mechanic Reviews)
// -----------------------------------------
const mechanicsFile = "./data/mechanics.json";
const loadReviews = () => {
  const data = fs.readFileSync(mechanicsFile, "utf8");
  return JSON.parse(data).reviews;
};

router.get("/page3", (req, res) => {
  const reviews = loadReviews();
  res.render("page3", { reviews });
});

router.post("/submit-review", (req, res) => {
  const { name, location, rating, review } = req.body;
  let reviews = loadReviews();
  reviews.push({ name, location, rating, review });
  fs.writeFileSync(mechanicsFile, JSON.stringify({ reviews }, null, 2));
  res.redirect("/page3");
});

// -----------------------------------------
// Page 4 Route (Submissions)
// -----------------------------------------
const submissionsFile = "./data/submissions.json";
let submissions = [];
if (fs.existsSync(submissionsFile)) {
  submissions = JSON.parse(fs.readFileSync(submissionsFile, "utf8")).submissions;
}

router.get("/page4", (req, res) => {
  res.render("page4", { submissions });
});

router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.redirect("/page4");
  }
  submissions.push({ name, email, message });
  fs.writeFileSync(submissionsFile, JSON.stringify({ submissions }, null, 2));
  res.redirect("/page4");
});

// -----------------------------------------
// Page 5 Route (Cars Data with Filters)
// -----------------------------------------
router.get("/page5", (req, res) => {
  const { year, model, price } = req.query;
  const carsData = JSON.parse(fs.readFileSync("./data/cars.json", "utf8"));

  // For each brand, filter the models based on query parameters
  let filteredBrands = carsData.brands.map((brand) => {
    let filteredModels = brand.models;

    // Filter by year if provided
    if (year && year.trim() !== "") {
      filteredModels = filteredModels.filter((m) => String(m.year) === year);
    }

    // Filter by model name if provided
    if (model && model.trim() !== "") {
      filteredModels = filteredModels.filter((m) =>
        m.name.toLowerCase().includes(model.toLowerCase())
      );
    }

    // Filter by max price if provided
    if (price && price.trim() !== "") {
      const maxPrice = Number(price);
      filteredModels = filteredModels.filter((m) => {
        // Remove non-numeric characters from the price string (e.g., "$55,000" → "55000")
        const numericPrice = Number(m.price.replace(/[^0-9.]/g, ""));
        return numericPrice <= maxPrice;
      });
    }

    return { ...brand, models: filteredModels };
  });

  // Only show brands with at least one model after filtering
  filteredBrands = filteredBrands.filter((b) => b.models.length > 0);

  res.render("page5", {
    brands: filteredBrands,
    selectedYear: year || "",
    selectedModel: model || "",
    selectedPrice: price || ""
  });
});

// -----------------------------------------
// Page 6 Route (About Page)
// -----------------------------------------
const aboutData = JSON.parse(fs.readFileSync("./data/about.json", "utf8"));
router.get("/page6", (req, res) => {
  res.render("page6", { about: aboutData });
});

export default router;
