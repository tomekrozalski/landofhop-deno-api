import { RouterContext } from "oak";

export function extractCookies(ctx: RouterContext): {
  [value: string]: string;
} {
  const cookieString = ctx.request.headers.get("cookie") ?? "";

  return cookieString.split(";").reduce((acc, current) => {
    const [key, value] = current.trim().split("=");
    return {
      ...acc,
      [key]: value,
    };
  }, {});
}
