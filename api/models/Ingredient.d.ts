import { IngredientType } from "/api/models/beverage/enums.ts";
import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type IngredientEssence = {
  badge: string;
  name: LanguageValue[];
  type: IngredientType;
  parent?: string;
};

export type Ingredient = IngredientEssence & { _id: string };
