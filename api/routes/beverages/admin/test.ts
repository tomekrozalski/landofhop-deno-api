import { RouterContext } from "oak";

export async function test(ctx: RouterContext) {
  ctx.response.body = { test: true };
}
