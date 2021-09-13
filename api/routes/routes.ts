import { Router } from "oak";
import getBasics from "./beverages/getBasics.ts";

const router = new Router();

router.get("/basics/:language?/:skip?/:limit?", async (ctx) => {
  ctx.response.body = await getBasics(ctx.params);
});

export default router;
