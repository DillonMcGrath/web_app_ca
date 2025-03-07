'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';

const app = express();
const port = 3000;

app.use(express.static("public"));

// ✅ Add middleware BEFORE defining routes
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data

const handlebars = create({extname: '.hbs'});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// ✅ Now apply the routes
app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
