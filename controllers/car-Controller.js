// controllers/car-controller.js
// This controller sends car brand data from the model to the view

import { carStore } from '../models/car-store.js';

export const carController = {
  // This method handles the GET request for page5
  index(req, res) {
    const allBrands = carStore.getAllBrands(); // Get all data from the model
    res.render('page5', { 
      title: 'Full Car Collection', 
      brands: allBrands 
    });
  }
};
