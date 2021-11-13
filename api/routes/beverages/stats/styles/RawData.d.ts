import { StyleGroup } from "/api/models/style.enums.ts";
import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type RawData = {
  amount: number;
  badge: string;
  name: LanguageValue;
  group: StyleGroup;
};
