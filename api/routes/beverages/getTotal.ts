import { RouterContext } from "oak";

import { basics } from "/db.ts";

export async function getTotal(ctx: RouterContext) {
  const total: number = await basics.count();

  ctx.response.body = total;
}
