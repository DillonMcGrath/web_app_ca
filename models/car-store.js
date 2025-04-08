// models/car-store.js

import fs from "fs";

// Read and parse the JSON file manually using fs
const rawData = fs.readFileSync("./models/car-store.json", "utf8");
const carData = JSON.parse(rawData);

// Plain English:
// This gives access to all car brand data from the JSON
const carStore = {
  getAllBrands() {
    return carData.brands;
  }
};

export default carStore;
