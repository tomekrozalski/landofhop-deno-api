import { RouterContext } from "oak";
import { compare } from "bcrypt";

import { createSession } from "/api/routes/sessions/createSession.ts";
import { createAndSaveJwtTokens } from "/api/utils/manageAuthTokens.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { users } from "/db.ts";

export async function authorize(ctx: RouterContext) {
  const result = ctx.request.body();
  const { email, password } = await result.value;
  const user = await users.findOne({ email });

  if (!user) {
    return respondWith(ctx, 400, "Authentication failed");
  }

  try {
    const isAuthorized = await compare(password, user.password);

    if (!isAuthorized) {
      return respondWith(ctx, 400, "Authentication failed");
    }

    const sessionToken = await createSession(ctx, {
      ip: ctx.request.ip,
      userAgent: ctx.request.headers.get("user-agent") ?? "",
      userId: user._id,
    });

    if (sessionToken) {
      await createAndSaveJwtTokens(ctx, {
        sessionToken,
        userId: user._id,
      });

      return respondWith(ctx, 200, "Authentication succeeded");
    } else {
      throw new Error("Session token creation failed");
    }
  } catch (err) {
    return respondWith(ctx, 500, "Decryption failed", err.message);
  }
}
