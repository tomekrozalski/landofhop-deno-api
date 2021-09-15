import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { ContainerType } from "/api/models/beverage/enums.ts";

export type BasicsOutput = {
  shortId: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue;
  };
  name: LanguageValue;
  coverImage?: {
    height: number;
    width: number;
    outline: string;
  };
  containerType: ContainerType;
  added: string;
};
