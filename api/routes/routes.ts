import { Router } from "oak";
import getBasics from "./beverages/getBasics.ts";

const router = new Router();

router
  .get("/api/quote", (ctx) => {
    ctx.response.body = { test: "hm" };
  })
  .get("/api/dwa", async (ctx) => {
    ctx.response.body = await getBasics();
  });

export default router;
