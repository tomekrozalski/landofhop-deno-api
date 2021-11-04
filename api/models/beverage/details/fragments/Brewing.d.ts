import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  ExpirationDateUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
  HopRateUnit,
} from "/api/models/beverage/enums.ts";
import { Aged } from "./Aged.d.ts";
import { IngredientTag } from "./IngredientTag.d.ts";

export type Brewing = {
  fermentation?: Fermentation[];
  extract?: {
    relate: ExtractRelate;
    unit: ExtractUnit;
    value: number;
  };
  alcohol?: {
    relate: AlcoholRelate;
    unit: AlcoholUnit;
    value: number;
    scope?: AlcoholScope;
  };
  filtration?: boolean;
  pasteurization?: boolean;
  aged?: Aged[];
  style?: LanguageValue[];
  isDryHopped?: boolean;
  dryHopped?: IngredientTag[];
  hopRate?: {
    unit: HopRateUnit;
    value: number;
  };
  nitrogen?: boolean;
  expirationDate?: {
    value: number;
    unit: ExpirationDateUnit;
  };
};
