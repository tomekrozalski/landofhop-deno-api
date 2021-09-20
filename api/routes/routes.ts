import { Router } from "oak";

import { authenticate } from "/api/middleware/authenticate.ts";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";
import { getTotal } from "./beverages/getTotal.ts";
import { searchByPhrase } from "./beverages/searchByPhrase.ts";
import { getStats } from "./beverages/stats/getStats.ts";
import { authorize } from "./user/authorize.ts";
import { test } from "./beverages/admin/test.ts";

const router = new Router();

router
  .get("/basics/:language?/:skip?/:limit?", getBasics)
  .get("/details/:language/:shortId/:brand/:name", getDetails)
  .get("/beverage/total", getTotal)
  .get("/beverage/search/:language/:phrase", searchByPhrase)
  .get("/beverage/stats/:language", getStats)
  .get("/admin/test", authenticate, test)
  .post("/authorize", authorize);

export default router;
