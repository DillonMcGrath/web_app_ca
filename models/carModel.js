import fs from 'fs';

const carsFilePath = './data/cars.json';

export function getAllCarBrands() {
  const data = fs.readFileSync(carsFilePath, 'utf-8');
  return JSON.parse(data).brands;
}