import { RouterContext } from "oak";
import { streamFromMultipart } from "multipart-stream";

import { basics, beverages } from "/db.ts";
import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function addBeverageCover(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const body = await ctx.request.body({ type: "form-data" });
  const data: any = await body.value.read();
  const { badge, brand, shortId } = data.fields;

  try {
    const [stream, boundary] = streamFromMultipart(
      async (multipartWriter: any) => {
        const img = await Deno.open(data.files[0].filename);
        await multipartWriter.writeFile(
          data.files[0].name,
          data.files[0].originalName,
          img
        );
        img.close();
      }
    );

    const response = await fetch(
      `${Deno.env.get("IMAGES_API")}/beverage/add-cover`,
      {
        method: "POST",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          path: `${brand}/${badge}/${shortId}`,
        },
        body: stream,
      }
    );

    const coverImage = await response.json();

    await beverages.updateOne(
      {
        shortId,
        badge,
        "label.general.brand.badge": brand,
      },
      {
        $set: {
          "editorial.photos.cover.height": coverImage.height,
          "editorial.photos.cover.width": coverImage.width,
          "editorial.photos.outlines.cover": coverImage.outlines,
        },
      }
    );

    await basics.updateOne(
      {
        shortId,
        badge,
        "brand.badge": brand,
      },
      { $set: { coverImage } }
    );

    const updatedBeverage:
      | {
          photos?: EditorialPhotos;
          updated?: Date;
        }
      | undefined = await beverages.findOne(
      {
        shortId,
        badge,
        "label.general.brand.badge": brand,
      },
      { projection: { _id: 0, photos: "$editorial.photos", updated: 1 } }
    );

    if (!updatedBeverage) {
      return respondWith(ctx, 404, "No beverage found");
    }

    const formattedData: EditorialPhotos | {} = updatedBeverage.photos ?? {};

    ctx.response.body = formattedData;
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong", err.message);
  }
}