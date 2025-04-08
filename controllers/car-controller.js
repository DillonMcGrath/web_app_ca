// controllers/car-controller.js
import carStore from "../models/car-store.js";

// Controller that handles rendering the cars page
function showCarsPage(req, res) {
  const { year, model, price } = req.query;

  // Filter brands and models based on query parameters
  let filteredBrands = carStore.brands.map((brand) => {
    let filteredModels = brand.models;

    if (year) {
      filteredModels = filteredModels.filter((m) => String(m.year) === year);
    }

    if (model) {
      filteredModels = filteredModels.filter((m) =>
        m.name.toLowerCase().includes(model.toLowerCase())
      );
    }

    if (price) {
      const maxPrice = Number(price);
      filteredModels = filteredModels.filter((m) => {
        const numericPrice = Number(m.price.replace(/[^0-9.]/g, ""));
        return numericPrice <= maxPrice;
      });
    }

    return { ...brand, models: filteredModels };
  });

  filteredBrands = filteredBrands.filter((b) => b.models.length > 0);

  res.render("page5", {
    brands: filteredBrands,
    selectedYear: year || "",
    selectedModel: model || "",
    selectedPrice: price || ""
  });
}

// Export as default properly
export default {
  showCarsPage
};
