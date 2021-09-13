import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import router from "./api/routes/routes.ts";
import { errorHandling, timer } from "./api/middleware/index.ts";

const app = new Application();

// Middlewares
app.use(errorHandling);
app.use(timer);

app.use(router.routes());

await app.listen({ port: 8000 });
