'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import start from './controllers/start.js';

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

router.get("/page4", (req, res) => {
  res.render("page4");
});


router.get("/page6", (req, res) => {
  res.render("page6");
});



import fs from 'fs';

const carsData = JSON.parse(fs.readFileSync('./data/cars.json', 'utf8'));

router.get("/page5", (req, res) => {
  console.log("Cars Data:", carsData);  // Debugging halemary
  res.render("page5", { cars: carsData.cars });
});



export default router;
