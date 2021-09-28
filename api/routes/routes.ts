import { Router } from "oak";

import { authenticate } from "/api/middleware/authenticate.ts";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";
import { getTotal } from "./beverages/getTotal.ts";
import { searchByPhrase } from "./beverages/searchByPhrase.ts";
import { getNotes } from "./beverages/admin/notes/getNotes.ts";
import { getStats } from "./beverages/stats/getStats.ts";
import { authorize } from "./sessions/authorize.ts";
import { unauthorize } from "./sessions/unauthorize.ts";
import { verifyToken } from "./sessions/verifyToken.ts";
import { getInstitutions } from "./institutions/getIntitutions.ts";

const router = new Router();

router
  .get("/basics/:language?/:skip?/:limit?", getBasics)
  .get("/details/:language/:shortId/:brand/:name", getDetails)
  .get(
    "/admin/beverage/notes/:language/:shortId/:brand/:name",
    authenticate,
    getNotes
  )
  .get("/beverage/total", getTotal)
  .get("/beverage/search/:language/:phrase", searchByPhrase)
  .get("/beverage/stats/:language", getStats)
  .post("/authorize", authorize)
  .get("/unauthorize", unauthorize)
  .get("/verifyToken", authenticate, verifyToken)
  .get("/admin/institutions", getInstitutions);

export default router;
