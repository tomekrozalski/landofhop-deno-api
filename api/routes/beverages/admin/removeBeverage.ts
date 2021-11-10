import { RouterContext } from "oak";

import { basics, beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function removeBeverage(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;

  const beverageToRemove = await beverages.findOne(
    { shortId },
    { noCursorTimeout: false }
  );

  if (!beverageToRemove) {
    return respondWith(ctx, 404, "Could not find the beverage");
  }

  const name = beverageToRemove.badge;
  const brand = beverageToRemove.label.general.brand.badge;

  try {
    if (beverageToRemove.editorial?.photos?.cover) {
      await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cover`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
      });
    }

    if (beverageToRemove.editorial?.photos?.gallery) {
      await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/gallery`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: `${brand}/${name}/${shortId}`,
          files: beverageToRemove.editorial.photos.gallery,
        }),
      });
    }

    if (beverageToRemove.editorial?.photos?.cap) {
      await fetch(`${Deno.env.get("IMAGES_API")}/beverage/remove/cap`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: `${brand}/${name}/${shortId}` }),
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
