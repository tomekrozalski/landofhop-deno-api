import { RouterContext } from "oak";

import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { normalizer as adminDetailsNormalizer } from "./normalizer.ts";
import type { AdminDetailsOutput } from "./AdminDetailsOutput.d.ts";

export async function getAdminDetails(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const value = await beverages.findOne({
    shortId,
    badge: name,
    "label.general.brand.badge": brand,
  });

  if (!value) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const formattedDetails: AdminDetailsOutput = adminDetailsNormalizer(value);
  ctx.response.body = formattedDetails;
}
