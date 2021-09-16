import { RouterContext } from "oak";
import format from "date-fns/format";

import { translate } from "/api/utils/translate.ts";
import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { beverages } from "/db.ts";
import type { BasicsOutput } from "./basics/BasicsOutput.d.ts";

export async function searchByPhrase(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;
  const phrase = ctx.params.phrase as string;

  const foundArr: BasicsOutput[] = [];

  const value = await beverages
    .aggregate([
      {
        $match: {
          $or: [
            // FIND BY:
            // Badge
            { badge: { $regex: new RegExp(phrase, "i") } },
            // Name
            { "label.general.name.value": { $regex: new RegExp(phrase, "i") } },
            // Brand name
            {
              "label.general.brand.name.value": {
                $regex: new RegExp(phrase, "i"),
              },
            },
            // Series (label / producer)
            {
              "label.general.series.value": { $regex: new RegExp(phrase, "i") },
            },
            {
              "producer.general.series.value": {
                $regex: new RegExp(phrase, "i"),
              },
            },
          ],
        },
      },
    ])
    .forEach(({ added, badge, editorial, label, shortId }) => {
      foundArr.push({
        added: format(new Date(added), DateFormat[language], {}),
        badge,
        brand: {
          badge: label.general.brand.badge,
          name: translate(label.general.brand.name, language),
        },
        containerType: label.container.type,
        ...(editorial?.photos?.cover &&
          editorial?.photos?.outlines?.cover && {
            coverImage: {
              height: editorial.photos.cover.height,
              width: editorial.photos.cover.width,
              outline: editorial.photos.outlines.cover,
            },
          }),
        name: translate(label.general.name, language),
        shortId,
      });
    });

  ctx.response.body = foundArr;
}
