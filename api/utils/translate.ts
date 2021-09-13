import type { LanguageValue } from "/api/models/common/index.d.ts";

export default function translate(
  values: LanguageValue[],
  desiredLanguage: string
): LanguageValue {
  return (
    values.find((item) => item.language === desiredLanguage) ||
    values.find((item) => !item.language) ||
    values[0]
  );
}
