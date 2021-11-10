import { RouterContext } from "oak";

import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function getPhotosDataByShortId(shortId: string) {
  const data = await beverages.findOne({ shortId }, { noCursorTimeout: false });

  if (!data) {
    throw new Error("No beverage found");
  }

  return {
    ...(data.editorial?.photos && { ...data.editorial.photos }),
    type: data.label.container.type,
  };
}

export async function getPhotosData(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;

  try {
    const data = await getPhotosDataByShortId(shortId);

    ctx.response.body = data;
  } catch (e) {
    return respondWith(ctx, 500, e.message);
  }
}
