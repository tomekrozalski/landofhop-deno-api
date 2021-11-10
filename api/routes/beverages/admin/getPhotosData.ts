import { RouterContext } from "oak";

import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import { ContainerType } from "/api/models/beverage/enums.ts";
import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function getPhotosData(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;

  const data = await beverages.findOne({ shortId }, { noCursorTimeout: false });

  if (!data) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const formattedData: (EditorialPhotos & { type: ContainerType }) | {} =
    {
      ...(data.editorial?.photos && { ...data.editorial.photos }),
      type: data.label.container.type,
    } ?? {};

  ctx.response.body = formattedData;
}
