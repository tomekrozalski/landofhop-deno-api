import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { IngredientType } from "/api/models/beverage/enums.ts";

export type IngredientTag = {
  badge: string;
  name: LanguageValue[];
  type: IngredientType;
};
