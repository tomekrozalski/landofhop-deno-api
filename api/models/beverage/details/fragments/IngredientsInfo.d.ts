import { IngredientTag } from "./IngredientTag.d.ts";
import { IngredientDescriptive } from "./IngredientDescriptive.d.ts";

export type IngredientsInfo = {
  descriptive?: IngredientDescriptive[];
  tags?: IngredientTag[];
  smokedMalt?: boolean;
};
