'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import start from './controllers/start.js';
import fs from 'fs';
const router = express.Router();

// Home route
router.get('/', start.createView);

// Page routes
router.get("/page2", (req, res) => {
  res.render("page2");
});




// Load existing submissions
const submissionsFile = './data/submissions.json';
let submissions = [];

if (fs.existsSync(submissionsFile)) {
    submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf8')).submissions;
}

// Route to render page4 with stored submissions
router.get("/page4", (req, res) => {
    res.render("page4", { submissions });
});

// Route to handle form submission
router.post("/submit", (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.redirect("/page4"); // Prevent empty submissions
    }

    // Add new entry to submissions array
    const newEntry = { name, email, message };
    submissions.push(newEntry);

    // Save updated data to file
    fs.writeFileSync(submissionsFile, JSON.stringify({ submissions }, null, 2));

    res.redirect("/page4"); // Reload page to show new entry
});



router.get("/page6", (req, res) => {
  res.render("page6");
});





const carsData = JSON.parse(fs.readFileSync('./data/cars.json', 'utf8'));

router.get("/page5", (req, res) => {
  console.log("Cars Data:", carsData);  // Debugging halemary
  res.render("page5", { cars: carsData.cars });
});


const mechanicsFile = './data/mechanics.json';

// Load existing reviews from the file
const loadReviews = () => {
  const data = fs.readFileSync(mechanicsFile, 'utf8');
  return JSON.parse(data).reviews;
};

// Route to display page3 with mechanic reviews
router.get("/page3", (req, res) => {
  const reviews = loadReviews();
  res.render("page3", { reviews }); // Pass reviews to Handlebars
});

// Route to handle new review submissions
router.post("/submit-review", (req, res) => {
  // Get data from the submitted form
  const { name, location, rating, review } = req.body;

  // Load existing reviews and add new one
  let reviews = loadReviews();
  reviews.push({ name, location, rating, review });

  // Save updated reviews back to file
  fs.writeFileSync(mechanicsFile, JSON.stringify({ reviews }, null, 2));

  // Refresh page to show updated reviews
  res.redirect("/page3");
});



export default router;
