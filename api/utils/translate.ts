import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";

export function translate(values: any[], desiredLanguage: AppLanguage) {
  return (
    values.find((item) => item.language === desiredLanguage) ||
    values.find((item) => !item.language) ||
    values[0]
  );
}
