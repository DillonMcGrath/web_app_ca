'use strict';

import express from 'express';
import logger from "./utils/logger.js";
import start from './controllers/start.js';

const router = express.Router();

// Home route
router.get('/', start.createView);

// Page routes
router.get("/second-page", (req, res) => {
  res.render("page2");
});

router.get("/page3", (req, res) => {
  res.render("page3");
});

router.get("/page4", (req, res) => {
  res.render("page4");
});

router.get("/page5", (req, res) => {
  res.render("page5");
});

export default router;
