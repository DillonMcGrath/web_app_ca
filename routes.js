"use strict";

import { carController } from './controllers/car-controller.js';
import express from "express";
import fs from "fs";
import start from "./controllers/start.js"; // Home controller

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
// Page 5 Route (Car Collection with Filters)
// -----------------------------------------

// We're not handling logic directly in the routes anymore —
// instead, we hand this off to the controller using MVC style.
// This makes our route cleaner and keeps everything organised properly.

router.get("/page5", carController.showCarBrands);
router.get('/page5/:brand', carController.showCarModels);
router.get('/page5/:brand/:modelId', carController.showCarDetails);
// -----------------------------------------
// Page 6 Route (About Page)
// -----------------------------------------
const aboutData = JSON.parse(fs.readFileSync("./data/about.json", "utf8"));
router.get("/page6", (req, res) => {
  res.render("page6", { about: aboutData });
});

export default router;
