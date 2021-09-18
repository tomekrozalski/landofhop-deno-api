import { RouterContext } from "oak";
import { compare } from "bcrypt";
// import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";
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
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: `User with the email address: ${email} not found`,
    };

    return;
  }

  try {
    const isAuthorized = await compare(password, user.password);

    if (!isAuthorized) {
      ctx.response.status = 400;
      return (ctx.response.body = {
        success: false,
        message: "Authentication failed, invalid password",
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
    ctx.response.headers.set("test", "test value");
    return (ctx.response.body = {
      success: true,
      message: "Authentication succeeded",
      // jwt,
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
