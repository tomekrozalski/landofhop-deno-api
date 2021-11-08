import { RouterContext } from "oak";

import { respondWith } from "/api/utils/respondWith.ts";
import type { PlaceEssence } from "/api/models/Place.d.ts";
import { places } from "/db.ts";

export async function getPlaces(ctx: RouterContext) {
  const data: PlaceEssence[] = [];

  await places
    .find({}, { noCursorTimeout: false })
    .forEach(({ city, country, institution, location, shortId }) => {
      data.push({
        city,
        country,
        institution,
        ...(location && {
          location: {
            type: location.type,
            coordinates: [+location.coordinates[0], +location.coordinates[1]],
          },
        }),
        shortId,
      });
    });

  if (!data || !data.length) {
    return respondWith(ctx, 404, "No place was found");
  }

  ctx.response.body = data;
}
