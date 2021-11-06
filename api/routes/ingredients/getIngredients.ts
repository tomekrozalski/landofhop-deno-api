import { RouterContext } from "oak";

import { respondWith } from "/api/utils/respondWith.ts";
import type { IngredientEssence } from "/api/models/Ingredient.d.ts";
import { ingredients } from "/db.ts";

export async function getIngredients(ctx: RouterContext) {
  const data: IngredientEssence[] = await ingredients
    .find(
      {},
      {
        projection: {
          _id: 0,
          badge: 1,
          name: 1,
          type: 1,
          parent: 1,
        },
      }
    )
    .toArray();

  if (!data || !data.length) {
    return respondWith(ctx, 404, "No ingredient was found");
  }

  ctx.response.body = data;
}
