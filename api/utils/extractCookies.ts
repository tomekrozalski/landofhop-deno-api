export function extractCookies(phrase: string): { [value: string]: string } {
  return phrase.split(";").reduce((acc, current) => {
    const [key, value] = current.trim().split("=");
    return {
      ...acc,
      [key]: value,
    };
  }, {});
}
