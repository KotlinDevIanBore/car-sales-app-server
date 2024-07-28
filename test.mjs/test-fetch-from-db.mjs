import fetchfromDb from '../models/fetch_cars_from_db.mjs';


export default async function testFetchFromDb() {
  try {
    const cars = await fetchfromDb();
    console.log('Fetched cars:', cars[0]);
  } catch (error) {
    console.error('Error testing fetchfromDb:', error);
  }
}

testFetchFromDb();

