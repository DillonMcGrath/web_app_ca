// models/car-store.js
import fs from "fs";

const filePath = "./models/car-store.json";

const carData = JSON.parse(fs.readFileSync(filePath, "utf8"));

export const carStore = {
  getAllBrands() {
    return carData.brands;
  },

  getBrand(name) {
    return carData.brands.find(b => b.name.toLowerCase() === name.toLowerCase());
  },

  getModel(brandName, modelId) {
    const brand = this.getBrand(brandName);
    if (!brand) return null;
    return brand.models.find(m => m.id === modelId);
  }
};
