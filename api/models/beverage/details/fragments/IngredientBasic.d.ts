import type { LanguageValue } from "/api/models/common/index.d.ts";
import { IngredientType } from "/api/models/beverage/enums/index.ts";

export type IngredientBasic = {
  id: string;
  badge: string;
  name: LanguageValue[];
  type: IngredientType;
};
