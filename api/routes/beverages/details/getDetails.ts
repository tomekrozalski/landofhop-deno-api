import { RouterContext } from "oak";

import { beverages } from "/db.ts";
import { normalizer } from "./normalizer.ts";

export async function getDetails(ctx: RouterContext) {
  const language = ctx.params.language as string;
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const value = await beverages.findOne({
    shortId,
    badge: name,
    "label.general.brand.badge": brand,
  });

  if (!value) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "No beverage found",
    };

    return;
  }

  const formattedValue = normalizer(value, language);

  ctx.response.body = formattedValue;
}
