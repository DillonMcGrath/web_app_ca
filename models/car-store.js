// car-store.js
import fs from "fs";

// Reads car data from JSON file and returns it
export function getAllCarBrands() {
  const data = fs.readFileSync("./data/cars.json", "utf8");
  return JSON.parse(data).brands;
}
