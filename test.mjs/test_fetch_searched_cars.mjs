import { getSearchedCar } from "../models/fetch_searched_cars.mjs";
export default async function testGetSearchedCar() {
  const searchTerm = 'mazda';
  try {
    const cars = await getSearchedCar(searchTerm);
    console.log('Fetch searched cars functions for term mazda:', cars);
  } catch (error) {
    console.error('Error testing getSearchedCar:', error);
  }
}

testGetSearchedCar();