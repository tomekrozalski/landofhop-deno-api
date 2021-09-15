import { RouterContext } from "oak";

import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { basics, beverages } from "/db.ts";
import { normalizer as detailsNormalizer } from "./normalizer.ts";
import type { DetailsOutput } from "./DetailsOutput.d.ts";
import type { LinkDataOutput } from "./LinkDataOutput.d.ts";
import type { AugmentedDetailsOutput } from "./AugmentedDetailsOutput.d.ts";

export async function getDetails(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;
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

  const previousBasics: LinkDataOutput[] = [];
  const nextBasics: LinkDataOutput[] = [];

  await basics
    .find({ added: { $lt: value.added } })
    .sort({ added: -1 })
    .limit(1)
    .forEach(({ badge, brand, shortId }) => {
      previousBasics.push({
        badge,
        brand: brand.badge,
        shortId,
      });
    });

  await basics
    .find({ added: { $gt: value.added } })
    .sort({ added: 1 })
    .limit(1)
    .forEach(({ badge, brand, shortId }) => {
      nextBasics.push({
        badge,
        brand: brand.badge,
        shortId,
      });
    });

  const formattedDetails: DetailsOutput = detailsNormalizer(value, language);

  const augmentedDetails: AugmentedDetailsOutput = {
    previous: previousBasics.length ? previousBasics[0] : null,
    details: formattedDetails,
    next: nextBasics.length ? nextBasics[0] : null,
  };

  ctx.response.body = augmentedDetails;
}
