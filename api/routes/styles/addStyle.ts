import { RouterContext } from "oak";
import { styles } from "/db.ts";

export async function addStyle(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const result = ctx.request.body();
  const styleData = await result.value;

  await styles.insertOne(styleData);

  return next();
}
