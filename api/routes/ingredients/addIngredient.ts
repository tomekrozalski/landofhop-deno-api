import { RouterContext } from "oak";
import { ingredients } from "/db.ts";

export async function addIngredient(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const result = ctx.request.body();
  const ingredientData = await result.value;

  await ingredients.insertOne(ingredientData);

  return next();
}
