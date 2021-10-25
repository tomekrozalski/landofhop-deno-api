import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  ExtractRelate,
  ExtractUnit,
} from "/api/models/beverage/enums.ts";
import type { Institution } from "/api/models/beverage/details/fragments/Institution.d.ts";
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
    tale?: Tale[];
    barcode?: string;
    // -----------
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
    // -----------
    container: Container;
  };
  producer?: {
    series?: LanguageValue[];
    cooperation?: Institution[];
    tale?: Tale[];
    // -----------
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
  };
  editorial?: {
    cooperation?: Institution[];
    // -----------
    style?: LanguageValue[];
    alcoholScope?: AlcoholScope;
    filtration?: boolean;
    pasteurization?: boolean;
    // -----------
    notes?: string;
  };
};
