import { RouterContext } from "oak";

import { translate } from "/api/utils/translate.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import type { IngredientPublic } from "/api/models/Ingredient.d.ts";
import { ingredients } from "/db.ts";

export async function getTranslatedIngredients(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;

  const data: IngredientPublic[] = [];

  await ingredients
    .find({}, { noCursorTimeout: false })
    .forEach(({ badge, name, type, parent }) => {
      data.push({
        badge,
        name: translate(name, language),
        type,
        parent,
      });
    });

  if (!data || !data.length) {
    return respondWith(ctx, 404, "No ingredient was found");
  }

  ctx.response.body = data;
}
