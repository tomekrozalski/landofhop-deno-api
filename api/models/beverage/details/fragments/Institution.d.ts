import { LanguageValue } from "/api/models/common/index.d.ts";

export type Institution = {
  badge: string;
  name: LanguageValue[];
  shortId: string;
  owner?: Institution;
};
