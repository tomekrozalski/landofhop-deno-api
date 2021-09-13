import { IngredientBasic } from "./IngredientBasic.d.ts";
import { IngredientDescription } from "./IngredientDescription.d.ts";

export type IngredientsInfo = {
  description?: IngredientDescription[];
  list?: IngredientBasic[];
  smokedMalt?: boolean;
};
