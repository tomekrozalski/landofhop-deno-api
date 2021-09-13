import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type Place = {
  city?: LanguageValue[];
  coordinates?: number[];
  country: LanguageValue[];
  id: string;
  institution: LanguageValue[];
};
