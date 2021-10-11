import { RouterContext } from "oak";
import { basics, beverages } from "/db.ts";
import type { BasicsWithoutId } from "/api/models/beverage/Basics.d.ts";
import type { BeverageWithoutId } from "/api/models/beverage/details/Beverage.d.ts";
import { respondWith } from "/api/utils/respondWith.ts";
import { generateShortId } from "/api/utils/generateShortId.ts";
import type { RequestTypes } from "./RequestTypes.d.ts";
import { formatBasics, formatBeverage } from "./formatValues.ts";

export async function addBeverage(ctx: RouterContext) {
  const result = ctx.request.body();
  const beverageData: RequestTypes = await result.value;

  try {
    const commonProps = {
      shortId: generateShortId(),
      added: new Date(),
    };

    const formattedBasics: BasicsWithoutId = formatBasics(
      beverageData,
      commonProps
    );
    const formattedBeverage: BeverageWithoutId = formatBeverage(
      beverageData,
      commonProps
    );

    await basics.insertOne(formattedBasics);
    await beverages.insertOne(formattedBeverage);

    return respondWith(ctx, 200, "Beverage successfully added");
  } catch (err) {
    return respondWith(ctx, 500, "Something went wrong");
  }
}
