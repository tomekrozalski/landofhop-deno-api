import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  Clarity,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
} from "/api/models/beverage/enums.ts";
import type { IngredientTag } from "/api/models/beverage/details/fragments/IngredientTag.d.ts";
import type { Institution } from "/api/models/beverage/details/fragments/Institution.d.ts";
import type { Price } from "/api/models/beverage/details/fragments/Price.d.ts";
import type { Tale } from "/api/models/beverage/details/fragments/Tale.d.ts";
import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { Container } from "/api/models/beverage/details/fragments/Container.d.ts";

export type RequestTypes = {
  label: {
    badge: string;
    // -----------
    name: LanguageValue[];
    series?: LanguageValue[];
    brand: Institution;
    cooperation?: Institution[];
    contract?: string;
    place?: {
      city: LanguageValue[];
      country: string;
      shortId: string;
    };
    remark?: LanguageValue[];
    isContract?: true;
    tale?: Tale[];
    barcode?: string;
    // -----------
    fermentation?: Fermentation[];
    style?: LanguageValue[];
    extract?: {
      value: number;
      unit: ExtractUnit;
      relate: ExtractRelate;
    };
    alcohol?: {
      value: number;
      unit: AlcoholUnit;
      relate: AlcoholRelate;
      scope?: AlcoholScope;
    };
    filtration?: boolean;
    pasteurization?: boolean;
    aged?: {
      previousContent?: AgedPreviousContent[];
      time?: {
        value: number;
        unit: AgedTimeUnit;
      };
      type?: AgedType;
      wood?: AgedWood;
    }[];
    isDryHopped?: boolean;
    dryHopped?: IngredientTag[];
    hopRate?: {
      value: number;
      unit: string;
    };
    nitrogen?: boolean;
    expirationDate?: {
      value: number;
      unit: string;
    };
    // -----------
    ingredients?: {
      complete: boolean;
      language: string;
      list: string[];
    }[];
    ingredientTags?: IngredientTag[];
    smokedMalt?: boolean;
    // -----------
    bitterness?: number;
    sweetness?: number;
    fullness?: number;
    power?: number;
    hoppyness?: number;
    temperature?: {
      from: number;
      to: number;
      unit: string;
    };
    // -----------
    container: Container;
    price?: Price[];
  };
  producer?: {
    series?: LanguageValue[];
    cooperation?: Institution[];
    contract?: string;
    isContract?: true;
    place?: {
      city: LanguageValue[];
      country: string;
      shortId: string;
    };
    remark?: LanguageValue[];
    tale?: Tale[];
    // -----------
    fermentation?: Fermentation[];
    style?: LanguageValue[];
    extract?: {
      value: number;
      unit: ExtractUnit;
      relate: ExtractRelate;
    };
    alcohol?: {
      value: number;
      unit: AlcoholUnit;
      relate: AlcoholRelate;
      scope?: AlcoholScope;
    };
    filtration?: boolean;
    pasteurization?: boolean;
    aged?: {
      previousContent?: AgedPreviousContent[];
      time?: {
        value: number;
        unit: AgedTimeUnit;
      };
      type?: AgedType;
      wood?: AgedWood;
    }[];
    isDryHopped?: boolean;
    dryHopped?: IngredientTag[];
    hopRate?: {
      value: number;
      unit: string;
    };
    nitrogen?: boolean;
    expirationDate?: {
      value: number;
      unit: string;
    };
    // -----------
    ingredients?: {
      complete: boolean;
      language: string;
      list: string[];
    }[];
    ingredientTags?: IngredientTag[];
    smokedMalt?: boolean;
    // -----------
    bitterness?: number;
    sweetness?: number;
    fullness?: number;
    power?: number;
    hoppyness?: number;
    temperature?: {
      from: number;
      to: number;
      unit: string;
    };
    // -----------
    price?: Price[];
  };
  editorial?: {
    cooperation?: Institution[];
    contract?: string;
    isContract?: true;
    place?: {
      city: LanguageValue[];
      country: string;
      shortId: string;
    };
    remark?: LanguageValue[];
    // -----------
    fermentation?: Fermentation[];
    styleTags?: {
      badge: string;
      name: LanguageValue[];
    }[];
    alcoholScope?: AlcoholScope;
    filtration?: boolean;
    pasteurization?: boolean;
    aged?: {
      previousContent?: AgedPreviousContent[];
      time?: {
        value: number;
        unit: AgedTimeUnit;
      };
      type?: AgedType;
      wood?: AgedWood;
    }[];
    isDryHopped?: boolean;
    dryHopped?: IngredientTag[];
    nitrogen?: boolean;
    // -----------
    color?: string;
    clarity?: Clarity;
    // -----------
    price?: Price[];
    notes?: string;
  };
};
