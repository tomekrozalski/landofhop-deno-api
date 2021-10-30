import { cleanDeep } from "/api/utils/cleanDeep.js";
import type { EditorialPhotos } from "/api/models/beverage/details/Editorial.d.ts";
import type { BasicsCoverImage } from "/api/models/beverage/Basics.d.ts";
import type { BasicsWithoutId } from "/api/models/beverage/Basics.d.ts";
import type { BeverageWithoutId } from "/api/models/beverage/details/Beverage.d.ts";
import type { RequestTypes } from "./RequestTypes.d.ts";

type CommonPropsTypes = {
  _id?: string;
  shortId: string;
  added: Date;
};

export function formatBasics(
  { label }: RequestTypes,
  commonProps: CommonPropsTypes,
  coverImage?: BasicsCoverImage
): BasicsWithoutId {
  return {
    badge: label.badge,
    brand: label.brand,
    name: label.name,
    ...(coverImage && { coverImage }),
    containerType: label.container.type,
    ...commonProps,
  };
}

export function formatBeverage(
  { editorial, label, producer }: RequestTypes,
  commonProps: CommonPropsTypes,
  photos?: EditorialPhotos
): BeverageWithoutId {
  return cleanDeep({
    badge: label.badge,
    label: {
      general: {
        name: label.name,
        series: label.series,
        brand: label.brand,
        cooperation: label.cooperation,
        contract: label.contract,
        isContract: label.isContract,
        place: label.place,
        remark: label.remark,
        tale: label.tale,
        barcode: label.barcode,
      },
      brewing: {
        fermentation: label.fermentation,
        style: label.style,
        extract: label.extract,
        alcohol: label.alcohol,
        filtration: label.filtration,
        pasteurization: label.pasteurization,
      },
      container: label.container,
      price: label.price?.map((props) => ({
        ...props,
        date: new Date(props.date),
      })),
    },
    producer: {
      general: {
        series: producer?.series,
        cooperation: producer?.cooperation,
        contract: producer?.contract,
        isContract: producer?.isContract,
        place: producer?.place,
        remark: producer?.remark,
        tale: producer?.tale,
      },
      brewing: {
        fermentation: producer?.fermentation,
        style: producer?.style,
        extract: producer?.extract,
        alcohol: producer?.alcohol,
        filtration: producer?.filtration,
        pasteurization: producer?.pasteurization,
      },
      price: producer?.price?.map((props) => ({
        ...props,
        date: new Date(props.date),
      })),
    },
    editorial: {
      general: {
        cooperation: editorial?.cooperation,
        contract: editorial?.contract,
        isContract: editorial?.isContract,
        place: editorial?.place,
        remark: editorial?.remark,
      },
      brewing: {
        fermentation: editorial?.fermentation,
        style: editorial?.style,
        alcohol: {
          scope: editorial?.alcoholScope,
        },
        filtration: editorial?.filtration,
        pasteurization: editorial?.pasteurization,
      },
      price: editorial?.price?.map((props) => ({
        ...props,
        date: new Date(props.date),
      })),
      ...(photos && { photos }),
      notes: editorial?.notes,
    },
    ...commonProps,
  });
}
