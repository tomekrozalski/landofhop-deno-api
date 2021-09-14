export function translate(values: any[], desiredLanguage: string) {
  return (
    values.find((item) => item.language === desiredLanguage) ||
    values.find((item) => !item.language) ||
    values[0]
  );
}
