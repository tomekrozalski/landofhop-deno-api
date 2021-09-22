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
      ["/authorize", "/unauthorize", "/verifyToken"].includes(url.pathname) ||
      !!url.pathname.match(/\/admin\//),
  }))
);

// Middlewares
app.use(errorHandling);
app.use(timer);

app.use(router.routes());

await app.listen({
  port: Number(Deno.env.get("PORT")),
  // @ToDo: it should run as secure https, but for now
  // I cannot set it up on Heroku
  // ...(Deno.env.get("ENVIRONMENT") === "production"
  //   ? {
  //       secure: true,
  //       certFile: Deno.env.get("SSL_CERTIFICATE") as string,
  //       keyFile: Deno.env.get("SSL_PRIVATE_KEY") as string,
  //       alpnProtocols: ["h2", "http/1.1"],
  //     }
  //   : {
  //       secure: false,
  //     }),
});
