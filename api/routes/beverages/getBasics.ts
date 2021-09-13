import { beverages } from "/db.ts";

async function getBasics() {
  const value = await beverages.findOne();

  return value;
}

export default getBasics;
