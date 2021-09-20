import { Application } from "oak";
import { oakCors } from "cors";
import "dotenv";

import router from "./api/routes/routes.ts";
import { errorHandling } from "./api/middleware/errorHandling.ts";
import { timer } from "./api/middleware/timer.ts";
import "./db.ts";

const app = new Application();

// Set CORS
app.use(
  oakCors(({ url }) => ({
    origin: [
      "http://localhost:3000",
      "https://hop.land",
      "https://landofhop.com",
    ],
    credentials:
      url.pathname === "/authorize" || !!url.pathname.match(/\/admin\//),
  }))
);

// Middlewares
app.use(errorHandling);
app.use(timer);

app.use(router.routes());

await app.listen({ port: Number(Deno.env.get("PORT")) });
