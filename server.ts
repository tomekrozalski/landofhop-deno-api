import { Application } from "oak";
import "dotenv";

import router from "./api/routes/routes.ts";
import { errorHandling, timer } from "./api/middleware/index.ts";
import "./db.ts";

const app = new Application();

// Middlewares
app.use(errorHandling);
app.use(timer);

app.use(router.routes());

await app.listen({ port: Number(Deno.env.get("PORT")) });
