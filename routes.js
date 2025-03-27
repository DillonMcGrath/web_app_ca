import express from "express";
import fs from "fs";

const router = express.Router();

// READ cars.json once
const carsFile = "./data/cars.json";
const carsData = JSON.parse(fs.readFileSync(carsFile, "utf8"));

// Assume carsData = { "brands": [ { "name": "Ford", "models": [...] }, ... ] }
// If your file is just [ { "name": "Ford", ... }, ... ] then tweak accordingly.
const brands = carsData.brands;

// Build a list of unique years and models for dropdowns
const allYears = new Set();
const allModels = new Set();

brands.forEach((brand) => {
  brand.models.forEach((m) => {
    allYears.add(m.year);
    allModels.add(m.name);
  });
});

// Convert sets to arrays and sort them
const uniqueYears = Array.from(allYears).sort();
const uniqueModels = Array.from(allModels).sort();

// GET route for page5
router.get("/page5", (req, res) => {
  const { year, model } = req.query;

  // Make a copy of the data to filter
  let filteredBrands = brands.map((brand) => {
    // Filter the brand's models if year/model query params exist
    let filteredModels = brand.models;

    // If 'year' was selected and not empty, filter by year
    if (year) {
      filteredModels = filteredModels.filter(
        (m) => String(m.year) === String(year)
      );
    }

    // If 'model' was selected and not empty, filter by model name (exact match)
    // For partial matches, use `.includes(...)` instead
    if (model) {
      filteredModels = filteredModels.filter(
        (m) => m.name.toLowerCase() === model.toLowerCase()
      );
    }

    // Return a new brand object with the filtered models
    return { ...brand, models: filteredModels };
  });

  // Optionally remove brands that now have zero models
  filteredBrands = filteredBrands.filter((brand) => brand.models.length > 0);

  // Render page5.hbs, passing:
  // 1) the filtered list
  // 2) the unique dropdown options
  // 3) the current selected filters (so we can keep them in the dropdown)
  res.render("page5", {
    brands: filteredBrands,
    uniqueYears,
    uniqueModels,
    selectedYear: year || "",
    selectedModel: model || "",
  });
});

export default router;
