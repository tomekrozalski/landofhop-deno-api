import { RouterContext } from "oak";

import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { basics, beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { countries } from "/api/utils/countries.ts";
import { normalizer as detailsNormalizer } from "./normalizer.ts";
import type { DetailsOutput } from "./DetailsOutput.d.ts";
import type { LinkDataOutput } from "./LinkDataOutput.d.ts";
import type { AugmentedDetailsOutput } from "./AugmentedDetailsOutput.d.ts";

export async function getDetails(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;
  const shortId = ctx.params.shortId as string;

  const value = await beverages.findOne(
    { shortId },
    { noCursorTimeout: false }
  );

  if (!value) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const previousBasics: LinkDataOutput[] = [];
  const nextBasics: LinkDataOutput[] = [];

  await basics
    .find({ added: { $lt: value.added } }, { noCursorTimeout: false })
    .sort({ added: -1 })
    .limit(1)
    .forEach(({ badge, brand, shortId }: any) => {
      previousBasics.push({
        badge,
        brand: brand.badge,
        shortId,
      });
    });

  await basics
    .find({ added: { $gt: value.added } }, { noCursorTimeout: false })
    .sort({ added: 1 })
    .limit(1)
    .forEach(({ badge, brand, shortId }: any) => {
      nextBasics.push({
        badge,
        brand: brand.badge,
        shortId,
      });
    });

  const formattedDetails: DetailsOutput = detailsNormalizer(
    value,
    language,
    language === "pl" ? countries.pl : countries.en
  );

  const augmentedDetails: AugmentedDetailsOutput = {
    previous: previousBasics.length ? previousBasics[0] : null,
    details: formattedDetails,
    next: nextBasics.length ? nextBasics[0] : null,
  };

  ctx.response.body = augmentedDetails;
}
