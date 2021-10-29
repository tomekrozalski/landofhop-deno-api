import { RouterContext } from "oak";
import { generateShortId } from "/api/utils/generateShortId.ts";
import { places } from "/db.ts";

export async function addPlace(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const result = ctx.request.body();
  const placeData = await result.value;

  await places.insertOne({
    ...placeData,
    shortId: generateShortId(),
  });

  return next();
}
