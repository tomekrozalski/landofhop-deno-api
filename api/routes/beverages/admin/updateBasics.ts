import { RouterContext } from "oak";
import { basics } from "/db.ts";
import type { BasicsCoverImage } from "/api/models/beverage/Basics.d.ts";
import type { BasicsWithoutId } from "/api/models/beverage/Basics.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import type { RequestTypes } from "/api/routes/beverages/admin/addBeverage/RequestTypes.d.ts";
import { formatBasics } from "/api/routes/beverages/admin/addBeverage/formatValues.ts";

export async function updateBasics(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const result = ctx.request.body();
  const beverageData: RequestTypes = await result.value;

  try {
    type BeverageData = {
      _id: string;
      added: Date;
      coverImage?: BasicsCoverImage;
    };

    const updatingBasics: BeverageData | undefined = await basics.findOne(
      {
        shortId,
        badge: name,
        "brand.badge": brand,
      },
      { projection: { _id: 0, added: 1, coverImage: 1 } }
    );

    if (!updatingBasics) {
      return respondWith(ctx, 404, "No beverage found");
    }

    const commonProps = {
      _id: updatingBasics._id,
      shortId,
      added: updatingBasics.added,
    };

    const formattedBasics: BasicsWithoutId = formatBasics(
      beverageData,
      commonProps,
      updatingBasics.coverImage
    );

    // @ToDo: should be replaced by replaceOne, add brand and name
    await basics.findAndModify({ shortId }, { update: formattedBasics });

    return respondWith(ctx, 200, "Beverage was successfully updated");
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong during updating basics");
  }
}
