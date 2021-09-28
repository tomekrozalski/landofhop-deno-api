import { RouterContext } from "oak";
import format from "date-fns/format";

import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import type { InstitutionEssence } from "/api/models/Institution.d.ts";
import { institutions } from "/db.ts";

export async function getInstitutions(ctx: RouterContext) {
  const data: InstitutionEssence[] = await institutions
    .find(
      {},
      {
        projection: {
          _id: 0,
          badge: 1,
          name: 1,
          owner: 1,
          shortId: 1,
          website: 1,
        },
      }
    )
    .toArray();

  if (!data || !data.length) {
    return respondWith(ctx, 404, "No beverage found");
  }

  ctx.response.body = data;
}
