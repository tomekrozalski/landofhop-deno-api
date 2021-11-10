import { RouterContext } from "oak";
import { basics } from "/db.ts";
import type { BasicsWithoutId } from "/api/models/beverage/Basics.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import type { RequestTypes } from "/api/routes/beverages/admin/addBeverage/RequestTypes.d.ts";
import { formatBasics } from "/api/routes/beverages/admin/addBeverage/formatValues.ts";

export async function updateBasics(ctx: RouterContext) {
  const shortId = ctx.params.shortId as string;
  const result = ctx.request.body();
  const beverageData: RequestTypes = await result.value;

  try {
    const updatingBasics = await basics.findOne(
      { shortId },
      {
        projection: { _id: 0, added: 1, coverImage: 1 },
        noCursorTimeout: false,
      }
    );

    if (!updatingBasics) {
      return respondWith(ctx, 404, "No beverage found");
    }

    const formattedBasics: BasicsWithoutId = formatBasics(
      beverageData,
      {
        _id: updatingBasics._id,
        shortId,
        added: updatingBasics.added,
      },
      updatingBasics.coverImage
    );

    // @ToDo: should be replaced by replaceOne?
    await basics.findAndModify({ shortId }, { update: formattedBasics });

    return respondWith(ctx, 200, "Beverage was successfully updated");
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong during updating basics");
  }
}
