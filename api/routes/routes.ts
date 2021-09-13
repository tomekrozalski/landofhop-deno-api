import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import getBasics from "./beverages/getBasics.ts";

const router = new Router();

router
  .get("/api/quote", (ctx) => {
    ctx.response.body = { test: "hm" };
  })
  .get("/api/dwa", async (ctx) => {
    ctx.response.body = await getBasics();
  });
// .get("/api/quote/:id", getQuote) // Get one quote of quoteID: id
// .post("/api/quote", addQuote) // Add a quote
// .put("/api/quote/:id", updateQuote) // Update a quote
// .delete("/api/quote/:id", deleteQuote); // Delete a quote

export default router;
