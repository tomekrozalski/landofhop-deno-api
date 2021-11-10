import { RouterContext } from "oak";

import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { normalizer as adminDetailsNormalizer } from "./normalizer.ts";
import type { AdminDetailsOutput } from "./AdminDetailsOutput.d.ts";

export async function getAdminDetails(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;

  const value = await beverages.findOne(
    { shortId },
    { noCursorTimeout: false }
  );

  if (!value) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const formattedDetails: AdminDetailsOutput = adminDetailsNormalizer(value);
  ctx.response.body = formattedDetails;
}
