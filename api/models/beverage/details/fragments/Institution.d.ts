import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export type Institution = {
  badge: string;
  name: LanguageValue[];
  shortId: string;
  owner?: Institution;
};
