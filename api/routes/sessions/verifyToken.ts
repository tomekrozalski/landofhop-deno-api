import { RouterContext } from "oak";

export async function verifyToken(ctx: RouterContext) {
  ctx.response.body = { verified: true };
}
