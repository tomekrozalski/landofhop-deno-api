import { RouterContext } from "oak";
import format from "date-fns/format";

import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { beverages } from "/db.ts";
import { respondWith } from "/api/utils/respondWith.ts";

type NotesOutput = {
  notes?: string;
  updated?: string;
};

type RawData = {
  notes?: string;
  updated?: Date;
};

export async function getNotes(ctx: RouterContext) {
  const language = ctx.params.language as AppLanguage;
  const shortId = ctx.params.shortId as string;
  const brand = ctx.params.brand as string;
  const name = ctx.params.name as string;

  const data: RawData | undefined = await beverages.findOne(
    {
      shortId,
      badge: name,
      "label.general.brand.badge": brand,
    },
    {
      projection: { _id: 0, notes: "$editorial.notes", updated: 1 },
      noCursorTimeout: false,
    }
  );

  if (!data) {
    return respondWith(ctx, 404, "No beverage found");
  }

  const formattedData: NotesOutput = {
    ...(data.notes && { notes: data.notes }),
    ...(data.updated && {
      updated: format(new Date(data.updated), DateFormat[language], {}),
    }),
  };

  ctx.response.body = formattedData;
}
