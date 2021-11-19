import { RouterContext } from "oak";
import { styles } from "/db.ts";
import type { Style, StyleEssence } from "/api/models/Style.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function updateStyle(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const badge = ctx.params.badge as string;
  const result = ctx.request.body();
  const styleData: StyleEssence = await result.value;

  try {
    const updatingStyle: { _id: string } | undefined = await styles.findOne(
      { badge },
      {
        projection: { _id: 1 },
        noCursorTimeout: false,
      }
    );

    if (!updatingStyle) {
      return respondWith(ctx, 404, "No style found");
    }

    const formattedStyle: Style = {
      _id: updatingStyle["_id"],
      ...styleData,
    };

    await styles.findAndModify({ badge }, { update: formattedStyle });

    return next();
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong during updating style");
  }
}
