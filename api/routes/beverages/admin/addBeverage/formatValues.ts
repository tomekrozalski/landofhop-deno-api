import { cleanDeep } from "/api/utils/cleanDeep.js";
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
  { editorial, label, producer }: RequestTypes,
  commonProps: CommonPropsTypes
): BeverageWithoutId {
  return cleanDeep({
    badge: label.badge,
    label: {
      general: {
        name: label.name,
        series: label.series,
        brand: label.brand,
        cooperation: label.cooperation,
      },
      container: label.container,
    },
    producer: {
      general: {
        series: producer?.series,
        cooperation: producer?.cooperation,
      },
    },
    editorial: {
      general: {
        cooperation: editorial?.cooperation,
      },
      notes: editorial?.notes,
    },
    ...commonProps,
  });

  // return {
  //   badge: label.badge,
  //   label: {
  //     general: {
  //       name: label.name,
  //       ...(label.series && { series: label.series }),
  //       brand: label.brand,
  //       ...(label.cooperation && { cooperation: label.cooperation }),
  //     },
  //     container: label.container,
  //   },
  //   ...(producer && {
  //     producer: {
  //       ...((producer.series || producer.cooperation) && {
  //         general: {
  //           ...(producer.series && { series: producer.series }),
  //           ...(producer.cooperation && { cooperation: producer.cooperation }),
  //         },
  //       }),
  //     },
  //   }),
  //   ...(editorial && {
  //     editorial: {
  //       ...(editorial.cooperation && {
  //         general: {
  //           ...(editorial.cooperation && {
  //             cooperation: editorial.cooperation,
  //           }),
  //         },
  //       }),
  //       ...(editorial.notes && { notes: editorial.notes }),
  //     },
  //   }),
  //   ...commonProps,
  // };
}
