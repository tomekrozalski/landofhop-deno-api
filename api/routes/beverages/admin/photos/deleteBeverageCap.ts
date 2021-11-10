import { RouterContext } from "oak";

import { beverages } from "/db.ts";
import { getPhotosDataByShortId } from "/api/routes/beverages/admin/getPhotosData.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function deleteBeverageCap(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;

  const data = await beverages.findOne({ shortId }, { noCursorTimeout: false });

  if (!data) {
    throw new Error("No beverage found");
  }

  const name = data.badge;
  const brand = data.label.general.brand.badge;

  try {
    await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cap`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
    });

    await beverages.updateOne(
      { shortId },
      { $unset: { "editorial.photos.cap": "" } }
    );

    const data = await getPhotosDataByShortId(shortId);

    ctx.response.body = data;
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong", err.message);
  }
}
