import { RouterContext } from "oak";
import format from "date-fns/format";

import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { generateShortId } from "/api/utils/generateShortId.ts";
import type { InstitutionEssence } from "/api/models/Institution.d.ts";
import { institutions } from "/db.ts";

export async function addInstitution(
  ctx: RouterContext,
  next: () => Promise<unknown>
) {
  const result = ctx.request.body();
  const institutionData = await result.value;

  await institutions.insertOne({
    ...institutionData,
    shortId: generateShortId(),
  });

  return next();
}
