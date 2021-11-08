import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type StyleEssence = {
  badge: string;
  name: LanguageValue[];
};

export type Style = StyleEssence & { _id: string };
