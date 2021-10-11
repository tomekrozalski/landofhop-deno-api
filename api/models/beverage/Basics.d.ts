import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { ContainerType } from "/api/models/beverage/enums.ts";

export type BasicsWithoutId = {
  shortId: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue[];
  };
  name: LanguageValue[];
  coverImage?: {
    height: number;
    width: number;
    outlines: string;
  };
  containerType: ContainerType;
  added: Date;
};

export type Basics = BasicsWithoutId & { _id: string };
