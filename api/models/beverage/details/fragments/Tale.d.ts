import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";

export type Tale = {
  language?: AppLanguage;
  lead: string;
  article?: string;
};
