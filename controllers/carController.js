import { getAllCarBrands } from '../models/carModel.js';

export const showCarsPage = (req, res) => {
  const brands = getAllCarBrands();
  res.render('page5', { brands });
};