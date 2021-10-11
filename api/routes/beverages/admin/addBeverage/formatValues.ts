import type { BasicsWithoutId } from "/api/models/beverage/Basics.d.ts";
import type { BeverageWithoutId } from "/api/models/beverage/details/Beverage.d.ts";
import type { RequestTypes } from "./RequestTypes.d.ts";

type CommonPropsTypes = {
  shortId: string;
  added: Date;
};

export function formatBasics(
  { label }: RequestTypes,
  commonProps: CommonPropsTypes
): BasicsWithoutId {
  return {
    badge: label.badge,
    brand: label.brand,
    name: label.name,
    containerType: label.container.type,
    ...commonProps,
  };
}

export function formatBeverage(
  { label }: RequestTypes,
  commonProps: CommonPropsTypes
): BeverageWithoutId {
  return {
    badge: label.badge,
    label: {
      general: {
        name: label.name,
        ...(label.series && { series: label.series }),
        brand: label.brand,
        ...(label.cooperation && { cooperation: label.cooperation }),
      },
      container: label.container,
    },
    ...commonProps,
  };
}
