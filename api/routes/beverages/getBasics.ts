import { beverages } from "../../../db.ts";

async function getBasics() {
  const values = await beverages.findOne();

  return {
    data: values,
  };
}

export default getBasics;
