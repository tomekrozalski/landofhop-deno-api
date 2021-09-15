import { Router } from "oak";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";
import { getTotal } from "./beverages/getTotal.ts";

const router = new Router();

router
  .get("/basics/:language?/:skip?/:limit?", getBasics)
  .get("/details/:language/:shortId/:brand/:name", getDetails)
  .get("/beverage/total", getTotal);

export default router;
