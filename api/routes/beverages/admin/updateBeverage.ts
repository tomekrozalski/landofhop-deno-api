import { RouterContext } from "oak";
import { beverages } from "/db.ts";
import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import type { BeverageWithoutId } from "/api/models/beverage/details/Beverage.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import type { RequestTypes } from "/api/routes/beverages/admin/addBeverage/RequestTypes.d.ts";
import { formatBeverage } from "/api/routes/beverages/admin/addBeverage/formatValues.ts";

export async function updateBeverage(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const result = ctx.request.body();
  const beverageData: RequestTypes = await result.value;

  try {
    type BeverageData = {
      _id: string;
      added: Date;
      photos?: EditorialPhotos;
    };

    const updatingBeverage: BeverageData | undefined = await beverages.findOne(
      {
        shortId,
        badge: name,
        "label.general.brand.badge": brand,
      },
      { projection: { added: 1, photos: "$editorial.photos" } }
    );

    if (!updatingBeverage) {
      return respondWith(ctx, 404, "No beverage found");
    }

    const formattedBeverage: BeverageWithoutId = formatBeverage(
      beverageData,
      {
        _id: updatingBeverage._id,
        shortId,
        added: updatingBeverage.added,
      },
      updatingBeverage.photos
    );

    // @ToDo: should be replaced by replaceOne, add brand and name
    await beverages.findAndModify({ shortId }, { update: formattedBeverage });

    return next();
  } catch (err) {
    return respondWith(
      ctx,
      500,
      "Something went wrong during updating beverage"
    );
  }
}