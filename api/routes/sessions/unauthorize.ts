import { RouterContext } from "oak";
import { verify } from "jsonwebtoken";
import { Bson } from "mongo";

import { key } from "/api/utils/manageAuthTokens.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { extractCookies } from "/api/utils/extractCookies.ts";
import { sessions } from "/db.ts";

export async function unauthorize(ctx: RouterContext) {
  try {
    const cookies = extractCookies(ctx);
    if (!cookies.accessToken) {
      return respondWith(ctx, 400, "Cannot found access token");
    }

    const payload = await verify(cookies.accessToken, key);
    if (!payload || !payload.userId || !payload.sessionToken) {
      return respondWith(ctx, 400, "Incorrect access token provided");
    }

    await sessions.deleteOne({
      sessionToken: payload.sessionToken,
      userId: new Bson.ObjectId(payload.userId),
    });

    ctx.cookies.set("accessToken", "", { expires: new Date() });
    ctx.cookies.set("refreshToken", "", { expires: new Date() });
  } catch (err) {
    return respondWith(ctx, 500, "Unauthorization failed", err.message);
  }
}
