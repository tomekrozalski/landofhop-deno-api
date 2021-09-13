import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { Brewing } from "./fragments/Brewing.d.ts";
import { Container } from "./fragments/Container.d.ts";
import { Impressions } from "./fragments/Impressions.d.ts";
import { IngredientsInfo } from "./fragments/IngredientsInfo.d.ts";
import { Institution } from "./fragments/Institution.d.ts";
import { Place } from "./fragments/Place.d.ts";
import { Price } from "./fragments/Price.d.ts";
import { Tale } from "./fragments/Tale.d.ts";

export type LabelGeneral = {
  name: LanguageValue[];
  series?: LanguageValue[];
  brand: Institution;
  cooperation?: Institution[];
  contract?: Institution;
  isContract?: boolean;
  place?: Place;
  remark?: LanguageValue[];
  tale?: Tale[];
  barcode?: string;
};

export type Label = {
  general: LabelGeneral;
  brewing?: Brewing;
  ingredients?: IngredientsInfo;
  impressions?: Impressions;
  container: Container;
  price?: Price[];
};
