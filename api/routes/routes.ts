import { Router } from "oak";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";
import { getTotal } from "./beverages/getTotal.ts";
import { searchByPhrase } from "./beverages/searchByPhrase.ts";

const router = new Router();

router
  .get("/basics/:language?/:skip?/:limit?", getBasics)
  .get("/details/:language/:shortId/:brand/:name", getDetails)
  .get("/beverage/total", getTotal)
  .get("/beverage/search/:language/:phrase", searchByPhrase);

export default router;
