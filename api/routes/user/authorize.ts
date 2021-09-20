import { RouterContext } from "oak";
import { compare } from "bcrypt";
import { create } from "jsonwebtoken";
import add from "date-fns/add";

import { createSession } from "/api/routes/sessions/createSession.ts";
import { users } from "/db.ts";

export async function authorize(ctx: RouterContext) {
  const result = ctx.request.body();
  const { email, password } = await result.value;
  const user = await users.findOne({ email });

  if (!user) {
    ctx.response.status = 400;
    return (ctx.response.body = {
      success: false,
      message: "Authentication failed",
    });
  }

  try {
    const isAuthorized = await compare(password, user.password);

    if (!isAuthorized) {
      ctx.response.status = 400;
      return (ctx.response.body = {
        success: false,
        message: "Authentication failed",
      });
    }

    const sessionToken = await createSession({
      ip: ctx.request.ip,
      userAgent: ctx.request.headers.get("user-agent") ?? "",
      userId: user._id,
    });

    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"]
    );

    const accessToken = await create(
      { alg: "HS512", typ: "JWT" },
      { sessionToken, userId: user._id },
      key
    );

    const refreshToken = await create(
      { alg: "HS512", typ: "JWT" },
      { sessionToken },
      key
    );

    ctx.response.status = 200;

    ctx.cookies.set("accessToken", accessToken, {
      domain: Deno.env.get("CLIENT_URL"),
      path: "/",
      httpOnly: true,
    });

    ctx.cookies.set("refreshToken", refreshToken, {
      domain: Deno.env.get("CLIENT_URL"),
      path: "/",
      httpOnly: true,
      expires: add(new Date(), { months: 3 }),
    });

    return (ctx.response.body = {
      success: true,
      message: "Authentication succeeded",
    });
  } catch (err) {
    ctx.response.status = 500;
    return (ctx.response.body = {
      success: false,
      message: "Decryption failed",
      details: err,
    });
  }
}
