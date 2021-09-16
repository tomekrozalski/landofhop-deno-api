import { RouterContext } from "oak";
import format from "date-fns/format";

import { translate } from "/api/utils/translate.ts";
import { DEFAULT_LANGUAGE } from "/api/utils/constants.ts";
import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { basics } from "/db.ts";
import type { BasicsOutput } from "./BasicsOutput.d.ts";

export async function getBasics(ctx: RouterContext) {
  const language = (ctx.params?.language ?? DEFAULT_LANGUAGE) as AppLanguage;
  const skip = ctx.params?.skip ?? "0";
  const limit = ctx.params?.limit ?? "1";

  const translatedValues: BasicsOutput[] = [];

  await basics
    .find()
    .sort({ added: -1 })
    .skip(+skip)
    .limit(+limit)
    .forEach(({ _id, added, brand, coverImage, name, ...rest }) => {
      translatedValues.push({
        name: translate(name, language),
        brand: {
          ...brand,
          name: translate(brand.name, language),
        },
        ...(coverImage && {
          coverImage: {
            height: coverImage.height,
            width: coverImage.width,
            outline: coverImage.outlines,
          },
        }),
        added: format(new Date(added), DateFormat[language], {}),
        ...rest,
      });
    });

  ctx.response.body = translatedValues;
}
