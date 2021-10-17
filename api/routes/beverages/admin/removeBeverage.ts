import { RouterContext } from "oak";

import { basics, beverages } from "/db.ts";
import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function removeBeverage(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  type BeverageToRemoveData = {
    added: Date;
    photos?: EditorialPhotos;
  };

  const beverageToRemove: BeverageToRemoveData | undefined =
    await beverages.findOne(
      {
        shortId,
        badge: name,
        "label.general.brand.badge": brand,
      },
      { projection: { _id: 0, added: 1, photos: "$editorial.photos" } }
    );

  if (!beverageToRemove) {
    return respondWith(ctx, 404, "Could not find the beverage");
  }

  try {
    if (beverageToRemove.photos?.cover) {
      await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cover`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
      });
    }

    if (beverageToRemove.photos?.gallery) {
      await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/gallery`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: `${brand}/${name}/${shortId}`,
          files: beverageToRemove.photos.gallery,
        }),
      });
    }

    await beverages.deleteOne({
      shortId,
      badge: name,
      "label.general.brand.badge": brand,
    });

    await basics.deleteOne({
      shortId,
      badge: name,
      "brand.badge": brand,
    });

    return respondWith(ctx, 200, "Beverage removed");
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong", err.message);
  }
}
