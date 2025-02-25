'use strict';

import express from 'express';
import logger from "./utils/logge";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
router.get('/', start.createView);


export default router;
