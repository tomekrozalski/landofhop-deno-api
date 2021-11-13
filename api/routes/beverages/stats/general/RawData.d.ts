import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  ContainerType,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
} from "/api/models/beverage/enums.ts";

export type RawData = {
  shortId: string;
  brand: {
    badge: string;
    shortId: string;
    name: LanguageValue;
  };
  fermentation: {
    label?: Fermentation[];
    producer?: Fermentation[];
    editorial?: Fermentation[];
  };
  extract: {
    label?: {
      relate: ExtractRelate;
      unit: ExtractUnit;
      value: number;
    };
    producer?: {
      relate: ExtractRelate;
      unit: ExtractUnit;
      value: number;
    };
  };
  alcohol: {
    label?: {
      relate: AlcoholRelate;
      unit: AlcoholUnit;
      value: number;
      scope?: AlcoholScope;
    };
    producer?: {
      relate: AlcoholRelate;
      unit: AlcoholUnit;
      value: number;
      scope?: AlcoholScope;
    };
    editorial?: {
      scope: AlcoholScope;
    };
  };
  container: {
    type: ContainerType;
  };
  added: Date;
};
