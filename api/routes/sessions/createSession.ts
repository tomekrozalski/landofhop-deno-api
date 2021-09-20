import { RouterContext } from "oak";
import { createSessionToken } from "/api/utils/createSessionToken.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { sessions } from "/db.ts";

type Props = {
  ip: string;
  userAgent: string;
  userId: string;
};

export async function createSession(
  ctx: RouterContext,
  { ip, userAgent, userId }: Props
) {
  try {
    const sessionToken = createSessionToken();

    await sessions.insertOne({
      createdAt: new Date(),
      ip,
      sessionToken,
      updatedAt: new Date(),
      userAgent,
      userId,
      valid: true,
    });

    return sessionToken;
  } catch (err) {
    return respondWith(ctx, 500, "Session creation failed", err.message);
  }
}
