import { RouterContext } from "oak";
import { streamFromMultipart } from "multipart-stream";

import { beverages } from "/db.ts";
import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function addBeverageGallery(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const body = await ctx.request.body({ type: "form-data" });
  const data: any = await body.value.read();
  const { badge, brand, shortId } = data.fields;

  try {
    const [stream, boundary] = streamFromMultipart(
      async (multipartWriter: any) => {
        for (let i = 0; i < data.files.length; i++) {
          const file = data.files[i];
          const name = file.filename;
          const originalName = file.originalName;

          const img = await Deno.open(name);
          await multipartWriter.writeFile(name, originalName, img);
          img.close();
        }
      }
    );

    const beverageToUpdate:
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
      {
        projection: { _id: 0, photos: "$editorial.photos", updated: 1 },
        noCursorTimeout: false,
      }
    );

    if (!beverageToUpdate) {
      return respondWith(ctx, 404, "No beverage found");
    }

    const removecount = beverageToUpdate.photos?.gallery?.toString() ?? "0";

    const response = await fetch(
      `${Deno.env.get("IMAGES_API")}/beverage/add-gallery`,
      {
        method: "POST",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          path: `${brand}/${badge}/${shortId}`,
          removecount,
        },
        body: stream,
      }
    );

    const { outlines } = await response.json();

    await beverages.updateOne(
      {
        shortId,
        badge,
        "label.general.brand.badge": brand,
      },
      {
        $set: {
          "editorial.photos.gallery": data.files.length,
          "editorial.photos.outlines.gallery": outlines,
        },
      }
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
      {
        projection: { _id: 0, photos: "$editorial.photos", updated: 1 },
        noCursorTimeout: false,
      }
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
