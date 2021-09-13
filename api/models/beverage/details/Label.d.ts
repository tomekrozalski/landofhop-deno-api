import type { LanguageValue } from "/api/models/common/index.d.ts";
import {
  Brewing,
  Container,
  Impressions,
  IngredientsInfo,
  Institution,
  Place,
  Price,
  Tale,
} from "./fragments/index.d.ts";

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
