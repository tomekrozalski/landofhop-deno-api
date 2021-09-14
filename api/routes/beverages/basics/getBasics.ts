import { RouterContext } from "oak";

import { translate } from "/api/utils/translate.ts";
import { DEFAULT_LANGUAGE } from "/api/utils/constants.ts";
import { basics } from "/db.ts";
import type { BasicsOutput } from "./BasicsOutput.d.ts";

export async function getBasics(ctx: RouterContext) {
  const language = ctx.params?.language ?? DEFAULT_LANGUAGE;
  const skip = ctx.params?.skip ?? "0";
  const limit = ctx.params?.limit ?? "1";

  const translatedValues: BasicsOutput[] = [];

  await basics
    .find()
    .skip(+skip)
    .limit(+limit)
    .forEach(({ _id, brand, name, ...rest }) => {
      translatedValues.push({
        name: translate(name, language),
        brand: {
          ...brand,
          name: translate(brand.name, language),
        },
        ...rest,
      });
    });

  ctx.response.body = translatedValues;
}
