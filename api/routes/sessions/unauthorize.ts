import { RouterContext } from "oak";
import { decode } from "jsonwebtoken";
import { Bson } from "mongo";

import { respondWith } from "/api/utils/respondWith.ts";
import { extractCookies } from "/api/utils/extractCookies.ts";
import { sessions } from "/db.ts";

export async function unauthorize(ctx: RouterContext) {
  try {
    const cookies = extractCookies(ctx);
    if (!cookies.accessToken) {
      return respondWith(ctx, 400, "Cannot found access token");
    }

    const { payload }: any = await decode(cookies.accessToken);

    if (!payload || !payload.sessionToken || !payload.userId) {
      return respondWith(ctx, 400, "Incorrect cookie payload");
    }

    await sessions.deleteOne({
      sessionToken: payload.sessionToken,
      userId: new Bson.ObjectId(payload.userId),
    });

    ctx.cookies.set("accessToken", "deleted", { expires: new Date(0) });
    ctx.cookies.set("refreshToken", "deleted", { expires: new Date(0) });

    return respondWith(ctx, 200, "Successfully logged out");
  } catch (err) {
    return respondWith(ctx, 500, "Unauthorization failed", err.message);
  }
}
