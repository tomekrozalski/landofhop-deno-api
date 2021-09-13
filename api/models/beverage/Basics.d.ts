import type { LanguageValue } from "/api/models/common/index.d.ts";
import { ContainerType } from "/api/models/beverage/enums/index.ts";

export type Basics = {
  _id: string;
  shortId: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue[];
  };
  name: LanguageValue[];
  coverImage?: {
    height?: number;
    width?: number;
    outlines?: string;
  };
  containerType: ContainerType;
  added: Date;
};
