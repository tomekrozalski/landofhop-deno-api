import { LanguageValue } from "/api/models/common/index.d.ts";

export type Institution = {
  badge: string;
  id: string;
  name: LanguageValue[];
  shortId: string;
  website?: string;
  consortium?: LanguageValue[];
};
