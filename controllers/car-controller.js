// /controllers/car-controller.js

import fs from 'fs';

// Load and parse the cars.json file
const carsData = JSON.parse(fs.readFileSync('./data/cars.json', 'utf8'));

// Show list of car brands
const showCarBrands = (req, res) => {
  res.render("page5", { brands: carsData.brands });
};

// Show models under a selected brand
const showCarModels = (req, res) => {
  const brand = req.params.brand;
  const selectedBrand = carsData.brands.find(b => b.name.toLowerCase() === brand.toLowerCase());
  if (!selectedBrand) return res.status(404).send("Brand not found");
  res.render("page5-models", { brand: selectedBrand });
};

// Show details of a selected model
const showCarDetails = (req, res) => {
  const brand = req.params.brand;
  const modelId = req.params.modelId;
  const selectedBrand = carsData.brands.find(b => b.name.toLowerCase() === brand.toLowerCase());
  if (!selectedBrand) return res.status(404).send("Brand not found");
  const model = selectedBrand.models.find(m => m.id === modelId);
  if (!model) return res.status(404).send("Model not found");
  res.render("page5-details", { brand: selectedBrand.name, model });
};

export default {
  showCarBrands,
  showCarModels,
  showCarDetails
};
