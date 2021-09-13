import type { LanguageValue } from "/api/models/common/index.d.ts";
import {
  Brewing,
  Impressions,
  IngredientsInfo,
  Institution,
  Place,
  Price,
  Tale,
} from "./fragments/index.d.ts";

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
