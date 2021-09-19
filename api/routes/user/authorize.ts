import { RouterContext } from "oak";
import { compare } from "bcrypt";
import { create } from "jsonwebtoken";
// import format from "date-fns/format";

// import { DEFAULT_LANGUAGE } from "/api/utils/constants.ts";
// import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { users } from "/db.ts";
// import type { BasicsOutput } from "./BasicsOutput.d.ts";

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

    // Deno.env.get("JWT_SECRET")

    //     const key = await crypto.subtle.generateKey(
    //       { name: "HMAC", hash: "SHA-512" },
    //       true,
    //       ["sign", "verify"]
    //     );
    //
    //     const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, key);
    //
    //     console.log("->", jwt);

    ctx.response.status = 200;

    ctx.cookies.set("test11", "value11", {
      path: "/",
      httpOnly: true,
      expires: new Date("2022-10-10"),
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
