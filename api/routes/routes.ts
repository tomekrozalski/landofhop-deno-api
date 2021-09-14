import { Router } from "oak";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";

const router = new Router();

router.get("/basics/:language?/:skip?/:limit?", getBasics);
router.get("/details/:language/:shortId/:brand/:name", getDetails);

export default router;
