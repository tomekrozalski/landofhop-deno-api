import { RouterContext } from "oak";

export function extractCookies(ctx: RouterContext): {
  [value: string]: string;
} {
  const cookieString = ctx.request.headers.get("cookie");
  if (!cookieString) throw new Error("Cookies not found");

  return cookieString.split(";").reduce((acc, current) => {
    const [key, value] = current.trim().split("=");
    return {
      ...acc,
      [key]: value,
    };
  }, {});
}
