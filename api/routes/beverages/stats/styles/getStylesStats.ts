import { RouterContext } from "oak";

import { translate } from "/api/utils/translate.ts";
import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import type { StyleTag } from "/api/models/beverage/details/Editorial.d.ts";
import { beverages, styles } from "/db.ts";
import type { RawData } from "./RawData.d.ts";

export async function getStylesStats(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;

  const rawData: RawData[] = [];

  await styles
    .find({}, { noCursorTimeout: false })
    .forEach(({ badge, name, group }) => {
      rawData.push({
        amount: 0,
        badge,
        name: translate(name, language),
        group,
      });
    });

  await beverages
    .find(
      {},
      {
        projection: {
          styleTags: "$editorial.brewing.styleTags",
        },
        noCursorTimeout: false,
      }
    )
    .forEach(({ _id, styleTags }: { _id: string; styleTags?: StyleTag[] }) => {
      if (styleTags?.length) {
        styleTags.forEach((styleTag: StyleTag) => {
          const index = rawData.findIndex(
            ({ badge }) => badge === styleTag.badge
          );

          rawData[index].amount += 1;
        });
      }
    });

  ctx.response.body = rawData.filter(({ amount }) => amount);
}
