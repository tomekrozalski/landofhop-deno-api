import { RouterContext } from "oak";
import { create } from "jsonwebtoken";
import add from "date-fns/add";

type Props = {
  sessionToken: string;
  userId: string;
};

export async function createAndSaveJwtTokens(
  ctx: RouterContext,
  { sessionToken, userId }: Props
) {
  const accessToken = await create(
    { alg: "HS512", typ: "JWT" },
    { sessionToken, userId },
    Deno.env.get("JWT_SECRET") as string
  );

  const refreshToken = await create(
    { alg: "HS512", typ: "JWT" },
    { sessionToken },
    Deno.env.get("JWT_SECRET") as string
  );

  await ctx.cookies.set("accessToken", accessToken, {
    domain: Deno.env.get("CLIENT_URL"),
    path: "/",
    httpOnly: true,
    // @ToDo: it should be secure cookie on production, but
    // for not https does not work with Heroku
    // secure: Deno.env.get("ENVIRONMENT") === "production",
    // sameSite: false,
  });

  await ctx.cookies.set("refreshToken", refreshToken, {
    domain: Deno.env.get("CLIENT_URL"),
    path: "/",
    httpOnly: true,
    // @ToDo: it should be secure cookie on production, but
    // for not https does not work with Heroku
    // secure: Deno.env.get("ENVIRONMENT") === "production",
    // sameSite: false,
    expires: add(new Date(), { weeks: 3 }),
  });
}
