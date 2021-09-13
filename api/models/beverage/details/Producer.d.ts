import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { Brewing } from "./fragments/Brewing.d.ts";
import { Impressions } from "./fragments/Impressions.d.ts";
import { IngredientsInfo } from "./fragments/IngredientsInfo.d.ts";
import { Institution } from "./fragments/Institution.d.ts";
import { Place } from "./fragments/Place.d.ts";
import { Price } from "./fragments/Price.d.ts";
import { Tale } from "./fragments/Tale.d.ts";

export type ProducerGeneral = {
  series?: LanguageValue[];
  brand?: Institution;
  cooperation?: Institution[];
  contract?: Institution;
  isContract?: boolean;
  place?: Place;
  remark?: LanguageValue[];
  tale?: Tale[];
};

export type Producer = {
  general?: ProducerGeneral;
  brewing?: Brewing;
  ingredients?: IngredientsInfo;
  impressions?: Impressions;
  price?: Price[];
};
