import { LanguageValue } from "/api/models/common/index.d.ts";

export type Place = {
  city?: LanguageValue[];
  coordinates?: number[];
  country: LanguageValue[];
  id: string;
  institution: LanguageValue[];
};
