import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import {
  AlcoholScope,
  Category,
  Clarity,
  Fermentation,
} from "/api/models/beverage/enums.ts";
import { Aged } from "./fragments/Aged.d.ts";
import { IngredientBasic } from "./fragments/IngredientBasic.d.ts";
import { Institution } from "./fragments/Institution.d.ts";
import { Place } from "./fragments/Place.d.ts";
import { Price } from "./fragments/Price.d.ts";

export type EditorialGeneral = {
  cooperation?: Institution[];
  contract?: Institution;
  isContract?: boolean;
  place?: Place;
  remark?: LanguageValue[];
};

export type EditorialBrewing = {
  beverageType?: Category;
  fermentation?: Fermentation[];
  alcohol?: {
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
};

export type EditorialImpressions = {
  color?: string;
  clarity?: Clarity;
};

export type EditorialPhotos = {
  cap?: boolean;
  cover?: {
    height: number;
    width: number;
  };
  gallery?: number;
  outlines?: {
    cover?: string;
    gallery?: string;
  };
};

export type Editorial = {
  general?: EditorialGeneral;
  brewing?: EditorialBrewing;
  impressions?: EditorialImpressions;
  price?: Price[];
  photos?: EditorialPhotos;
  notes?: string;
};
