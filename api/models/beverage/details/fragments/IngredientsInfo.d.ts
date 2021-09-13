import { IngredientBasic, IngredientDescription } from "./index.d.ts";

export type IngredientsInfo = {
  description?: IngredientDescription[];
  list?: IngredientBasic[];
  smokedMalt?: boolean;
};
