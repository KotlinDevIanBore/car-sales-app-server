import mostClickedCars from "../models/most-clicked_cars.mjs";

export default async function testMostClickedCars() {
  try {
    const ClickedCars = await mostClickedCars();
    console.log(`Most Clicked Cars function passed test ${ClickedCars}`);
  } catch (error) {
    console.error(`Most Clicked Cars function failed test: ${error.message}`);
  }
}

testMostClickedCars();