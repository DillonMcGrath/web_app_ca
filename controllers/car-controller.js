// controllers/car-controller.js
import { carStore } from "../models/car-store.js";

export const carController = {
  showCarBrands(req, res) {
    const brands = carStore.getAllBrands();
    res.render("page5", { brands });
  },

  showCarModels(req, res) {
    const brand = carStore.getBrand(req.params.brand);
    if (!brand) return res.status(404).send("Brand not found");
    res.render("page5-models", { brand });
  },

  showCarDetails(req, res) {
    const { brand, modelId } = req.params;
    const model = carStore.getModel(brand, modelId);
    if (!model) return res.status(404).send("Model not found");
    res.render("page5-details", { model });
  }
};
