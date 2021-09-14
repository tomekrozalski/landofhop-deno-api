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
import { IngredientBasic } from "./IngredientBasic.d.ts";

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
  dryHopped?: {
    hops: {
      type: IngredientBasic[];
    };
  };
  hopRate?: {
    unit: HopRateUnit;
    value: number;
  };
  expirationDate?: {
    value: number;
    unit: ExpirationDateUnit;
  };
};
