import { RouterContext } from "oak";

import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";

type RawData = {
  photos?: EditorialPhotos;
  updated?: Date;
};

export async function getPhotosData(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const data: RawData | undefined = await beverages.findOne(
    {
      shortId,
      badge: name,
      "label.general.brand.badge": brand,
    },
    {
      projection: { _id: 0, photos: "$editorial.photos", updated: 1 },
      noCursorTimeout: false,
    }
  );

  if (!data) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const formattedData: EditorialPhotos | {} = data.photos ?? {};

  ctx.response.body = formattedData;
}
