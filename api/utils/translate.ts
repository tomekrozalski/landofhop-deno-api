import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";

export function translate(
  values: LanguageValue[],
  desiredLanguage: string
): LanguageValue {
  return (
    values.find((item) => item.language === desiredLanguage) ||
    values.find((item) => !item.language) ||
    values[0]
  );
}
