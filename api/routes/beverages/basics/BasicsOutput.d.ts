import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { ContainerType } from "/api/models/beverage/enums.ts";

export type BasicsOutput = {
  added: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue;
  };
  containerType: ContainerType;
  coverImage?: {
    height: number;
    width: number;
    outline: string;
  };
  name: LanguageValue;
  shortId: string;
};
