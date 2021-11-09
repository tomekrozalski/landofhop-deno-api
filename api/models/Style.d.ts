import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { StyleGroup as StyleGroupEnum } from "./style.enums.ts";

export type StyleEssence = {
  badge: string;
  name: LanguageValue[];
  group: StyleGroupEnum;
};

export type Style = StyleEssence & { _id: string };
