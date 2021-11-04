import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
} from "/api/models/beverage/enums.ts";
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
    hopRate?: {
      value: number;
      unit: string;
    };
    expirationDate?: {
      value: number;
      unit: string;
    };
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
    hopRate?: {
      value: number;
      unit: string;
    };
    expirationDate?: {
      value: number;
      unit: string;
    };
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
    style?: LanguageValue[];
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
    // -----------
    price?: Price[];
    notes?: string;
  };
};
