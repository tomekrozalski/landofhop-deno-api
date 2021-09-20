import randomBytes from "https://deno.land/std@0.107.0/node/_crypto/randomBytes.ts";
import { sessions } from "/db.ts";

type Props = {
  ip: string;
  userAgent: string;
  userId: string;
};

export async function createSession({ ip, userAgent, userId }: Props) {
  try {
    // Generate a session token
    const sessionToken = randomBytes(43).toString("hex");
    // database insert for session
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
  } catch (e) {
    throw new Error("Session creation failed");
  }
}
