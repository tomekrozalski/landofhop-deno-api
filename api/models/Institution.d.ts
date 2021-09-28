import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type InstitutionEssence = {
  badge: string;
  name: LanguageValue[];
  owner?: InstitutionEssence;
  shortId: string;
  website?: string;
};

export type Institution = InstitutionEssence & { _id: string };
