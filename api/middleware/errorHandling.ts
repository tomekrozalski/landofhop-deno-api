import { Context, isHttpError, Status } from "oak";

async function errorHandling(_: Context, next: () => Promise<unknown>) {
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
