import { RouterContext } from "oak";
import { beverages } from "/db.ts";
import type { StyleTag } from "/api/models/beverage/details/Editorial.d.ts";
import type { Style, StyleEssence } from "/api/models/Style.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";

export async function updateBeverageStyle(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const badge = ctx.params.badge as string;
  const result = ctx.request.body();
  const styleData: StyleEssence = await result.value;

  try {
    await beverages
      .find(
        { "editorial.brewing.styleTags.badge": badge },
        { noCursorTimeout: false }
      )
      .forEach(async (props) => {
        const styleTags = (props.editorial?.brewing?.styleTags ??
          []) as StyleTag[];

        styleTags.splice(
          styleTags.findIndex((props) => props.badge === badge),
          1,
          { badge: styleData.badge, name: styleData.name }
        );

        await beverages.findAndModify({ _id: props._id }, { update: props });
      });

    return next();
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong during updating style");
  }
}
