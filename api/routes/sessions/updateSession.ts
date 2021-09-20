import { RouterContext } from "oak";
import { createSessionToken } from "/api/utils/createSessionToken.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { sessions } from "/db.ts";

type Props = {
  ip: string;
  sessionToken: string;
  userAgent: string;
};

export async function updateSession(
  ctx: RouterContext,
  { ip, sessionToken, userAgent }: Props
) {
  try {
    const newSessionToken = createSessionToken();

    await sessions.updateOne(
      { sessionToken },
      {
        $set: {
          ip,
          sessionToken: newSessionToken,
          updatedAt: new Date(),
          userAgent,
          valid: true,
        },
      }
    );

    return newSessionToken;
  } catch (err) {
    return respondWith(ctx, 500, "Session update failed", err.message);
  }
}
