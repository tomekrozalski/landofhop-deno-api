import { RouterContext } from "oak";
import { verify } from "jsonwebtoken";
import { Bson } from "mongo";

import { key } from "/api/utils/manageAuthTokens.ts";
import { extractCookies } from "/api/utils/extractCookies.ts";
import { createAndSaveJwtTokens } from "/api/utils/manageAuthTokens.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { updateSession } from "/api/routes/sessions/updateSession.ts";
import { sessions } from "/db.ts";

export async function authenticate(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  try {
    const cookies = extractCookies(ctx);
    if (!cookies.accessToken && !cookies.refreshToken) {
      return respondWith(ctx, 401, "Unauthorized");
    }

    if (cookies.accessToken) {
      const payload = await verify(cookies.accessToken, key);
      if (!payload || !payload.userId || !payload.sessionToken) {
        return respondWith(ctx, 403, "Incorrect access token provided");
      }

      const session = await sessions.findOne({
        sessionToken: payload.sessionToken,
        userId: new Bson.ObjectId(payload.userId),
      });

      if (session?.valid) {
        return next();
      }
    }

    if (cookies.refreshToken) {
      const payload = await verify(cookies.refreshToken, key);
      if (!payload || !payload.sessionToken) {
        return respondWith(ctx, 403, "Incorrect refresh token provided");
      }

      const session = await sessions.findOne({
        sessionToken: payload.sessionToken,
      });

      if (session?.valid) {
        const newSessionToken = await updateSession(ctx, {
          ip: ctx.request.ip,
          sessionToken: session.sessionToken,
          userAgent: ctx.request.headers.get("user-agent") ?? "",
        });

        if (newSessionToken) {
          await createAndSaveJwtTokens(ctx, {
            sessionToken: newSessionToken,
            userId: session.userId,
          });

          return next();
        }
      }
    }

    return respondWith(ctx, 403, "Authentication failed");
  } catch (err) {
    return respondWith(ctx, 500, "Authentication error", err.message);
  }
}
