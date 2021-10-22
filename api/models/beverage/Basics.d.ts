import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { ContainerType } from "/api/models/beverage/enums.ts";

export type BasicsCoverImage = {
  height: number;
  width: number;
  outlines: string;
};

export type BasicsWithoutId = {
  shortId: string;
  badge: string;
  brand: {
    badge: string;
    name: LanguageValue[];
  };
  name: LanguageValue[];
  coverImage?: BasicsCoverImage;
  containerType: ContainerType;
  added: Date;
};

export type Basics = BasicsWithoutId & { _id: string };
