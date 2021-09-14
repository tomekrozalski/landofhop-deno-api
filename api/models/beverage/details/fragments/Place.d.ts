import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type Place = {
  city?: LanguageValue[];
  country: string;
};
