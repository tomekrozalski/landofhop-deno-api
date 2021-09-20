import { RouterContext } from "oak";

export function respondWith(
  ctx: RouterContext,
  status: number,
  message: string,
  additionalMessage?: string
) {
  ctx.response.status = status;
  ctx.response.body = {
    success: status < 300,
    message,
    ...(additionalMessage && { additionalMessage }),
  };

  return;
}
