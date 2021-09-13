import { RouteParams } from "oak";

import { DEFAULT_LANGUAGE, translate } from "/api/utils/index.ts";
import { basics } from "/db.ts";
import type { BasicsOutput } from "./output.d.ts";

async function getBasics(params: RouteParams) {
  const language = params?.language ?? DEFAULT_LANGUAGE;
  const skip = params?.skip ?? "0";
  const limit = params?.limit ?? "1";

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

  return translatedValues;
}

export default getBasics;
