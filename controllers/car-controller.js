// car-controller.js
import { getAllCarBrands } from "../models/car-store.js";

function showCarBrands(req, res) {
  const brands = getAllCarBrands();
  res.render("page5", { brands });
}

export default { showCarBrands };
