// controllers/car-controller.js

import carStore from "../models/car-store.js";

// This controller handles displaying cars grouped by brand and filtered if needed
export function showCarsPage(req, res) {
  const { year, model, price } = req.query;
  const allBrands = carStore.getAllBrands();

  const filteredBrands = allBrands
    .map((brand) => {
      let filteredModels = brand.models;

      if (year && year.trim() !== "") {
        filteredModels = filteredModels.filter((m) => String(m.year) === year);
      }

      if (model && model.trim() !== "") {
        filteredModels = filteredModels.filter((m) =>
          m.name.toLowerCase().includes(model.toLowerCase())
        );
      }

      if (price && price.trim() !== "") {
        const maxPrice = Number(price);
        filteredModels = filteredModels.filter((m) => {
          const numericPrice = Number(m.price.replace(/[^0-9.]/g, ""));
          return numericPrice <= maxPrice;
        });
      }

      return { ...brand, models: filteredModels };
    })
    .filter((b) => b.models.length > 0);

  res.render("page5", {
    brands: filteredBrands,
    selectedYear: year || "",
    selectedModel: model || "",
    selectedPrice: price || "",
  });
}
