import { RouterContext } from "oak";
import { streamFromMultipart } from "multipart-stream";

import { basics, beverages } from "/db.ts";
import { getPhotosDataByShortId } from "/api/routes/beverages/admin/getPhotosData.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function addBeverageCover(ctx: RouterContext) {
  const body = await ctx.request.body({ type: "form-data" });
  const bodyData: any = await body.value.read();
  const { badge, brand, shortId } = bodyData.fields;

  try {
    const [stream, boundary] = streamFromMultipart(
      async (multipartWriter: any) => {
        const img = await Deno.open(bodyData.files[0].filename);
        await multipartWriter.writeFile(
          bodyData.files[0].name,
          bodyData.files[0].originalName,
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
      { shortId },
      {
        $set: {
          "editorial.photos.cover.height": coverImage.height,
          "editorial.photos.cover.width": coverImage.width,
          "editorial.photos.outlines.cover": coverImage.outlines,
        },
      }
    );

    await basics.updateOne({ shortId }, { $set: { coverImage } });
    const data = await getPhotosDataByShortId(shortId);
    ctx.response.body = data;
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong", err.message);
  }
}
