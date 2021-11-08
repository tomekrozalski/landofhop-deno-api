import { RouterContext } from "oak";

import { respondWith } from "/api/utils/respondWith.ts";
import type { StyleEssence } from "/api/models/Style.d.ts";
import { styles } from "/db.ts";

export async function getStyles(ctx: RouterContext) {
  const data: StyleEssence[] = [];

  await styles
    .find(
      {},
      {
        projection: {
          _id: 0,
          badge: 1,
          name: 1,
        },
        noCursorTimeout: false,
      }
    )
    .forEach((props) => {
      data.push(props);
    });

  if (!data || !data.length) {
    return respondWith(ctx, 404, "No style was found");
  }

  ctx.response.body = data;
}
