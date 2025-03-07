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

router.get("/page3", (req, res) => {
  res.render("page3");
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



export default router;
