import { RouterContext } from "oak";
import { generateShortId } from "/api/utils/generateShortId.ts";
import { institutions } from "/db.ts";

export async function addInstitution(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const result = ctx.request.body();
  const institutionData = await result.value;

  await institutions.insertOne({
    ...institutionData,
    shortId: generateShortId(),
  });

  return next();
}
