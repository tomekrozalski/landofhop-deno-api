import { Context } from "oak";

export async function timer(ctx: Context, next: () => Promise<unknown>) {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  const difference = endTime - startTime;

  ctx.response.headers.set("X-Response-Time", `${difference}ms`);
}
