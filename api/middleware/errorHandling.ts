import {
  Context,
  isHttpError,
  Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";

async function errorHandling(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          break;
        default:
      }
    } else {
      throw err;
    }
  }
}

export default errorHandling;
