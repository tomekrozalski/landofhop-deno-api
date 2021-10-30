import { lodash } from "lodash";
import format from "date-fns/format";

import { translate } from "/api/utils/translate.ts";
import { deleteIfEmpty } from "/api/utils/deleteIfEmpty.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import { Institution as InstitutionTypes } from "/api/models/beverage/details/fragments/Institution.d.ts";
import type { DetailsOutput, InsitutionOutput } from "./DetailsOutput.d.ts";

export function normalizer(
  beverage: BeverageTypes,
  desiredLanguage: AppLanguage,
  countries: { [value: string]: string }
): DetailsOutput {
  function formatIntitution({
    badge,
    name,
    shortId,
    owner,
  }: InstitutionTypes): InsitutionOutput {
    return {
      badge,
      name: translate(name, desiredLanguage),
      ...(owner && {
        owner: formatIntitution(owner),
      }),
      shortId,
    };
  }

  const formattedObject = {
    shortId: beverage.shortId,
    badge: beverage.badge,
    name: translate(beverage.label.general.name, desiredLanguage),
    series: {
      ...(beverage.label.general.series && {
        label: beverage.label.general.series,
      }),
      ...(beverage.producer?.general?.series && {
        producer: beverage.producer.general.series,
      }),
    },
    brand: formatIntitution(beverage.label.general.brand),
    cooperation: {
      ...(beverage.label.general.cooperation?.length && {
        label: beverage.label.general.cooperation?.map(formatIntitution),
      }),
      ...(beverage.producer?.general?.cooperation?.length && {
        producer: beverage.producer.general.cooperation.map(formatIntitution),
      }),
      ...(beverage.editorial?.general?.cooperation?.length && {
        editorial: beverage.editorial.general.cooperation.map(formatIntitution),
      }),
    },
    contract: {
      ...(beverage.label.general.contract && {
        label: formatIntitution(beverage.label.general.contract),
      }),
      ...(beverage.producer?.general?.contract && {
        producer: formatIntitution(beverage.producer.general.contract),
      }),
      ...(beverage.editorial?.general?.contract && {
        editorial: formatIntitution(beverage.editorial.general.contract),
      }),
    },
    isContract: {
      ...(lodash.isBoolean(beverage.label.general.isContract) && {
        label: beverage.label.general.isContract,
      }),
      ...(lodash.isBoolean(beverage.producer?.general?.isContract) && {
        producer: beverage.producer?.general?.isContract,
      }),
      ...(lodash.isBoolean(beverage.editorial?.general?.isContract) && {
        editorial: beverage.editorial?.general?.isContract,
      }),
    },
    place: {
      ...(beverage.label.general.place?.city && {
        label: {
          city: translate(beverage.label.general.place.city, desiredLanguage),
          country: countries[beverage.label.general.place.country],
        },
      }),
      ...(beverage.producer?.general?.place?.city && {
        producer: {
          city: translate(
            beverage.producer.general.place.city,
            desiredLanguage
          ),
          country: countries[beverage.producer.general.place.country],
        },
      }),
      ...(beverage.editorial?.general?.place?.city && {
        editorial: {
          city: translate(
            beverage.editorial.general.place.city,
            desiredLanguage
          ),
          country: countries[beverage.editorial.general.place.country],
        },
      }),
    },
    remark: {
      ...(beverage.label.general.remark && {
        label: translate(beverage.label.general.remark, desiredLanguage),
      }),
      ...(beverage.producer?.general?.remark && {
        producer: translate(beverage.producer.general.remark, desiredLanguage),
      }),
    },
    tale: {
      ...(beverage.label.general.tale && {
        label: beverage.label.general.tale,
      }),
      ...(beverage.producer?.general?.tale && {
        producer: translate(beverage.producer.general.tale, desiredLanguage),
      }),
    },
    ...(beverage.label.general.barcode && {
      barcode: beverage.label.general.barcode,
    }),
    fermentation: {
      ...(beverage.label.brewing?.fermentation?.length && {
        label: beverage.label.brewing.fermentation,
      }),
      ...(beverage.producer?.brewing?.fermentation?.length && {
        producer: beverage.producer.brewing.fermentation,
      }),
      ...(beverage.editorial?.brewing?.fermentation?.length && {
        editorial: beverage.editorial.brewing.fermentation,
      }),
    },
    extract: {
      ...(beverage.label.brewing?.extract && {
        label: {
          relate: beverage.label.brewing.extract.relate,
          unit: beverage.label.brewing.extract.unit,
          value: +beverage.label.brewing.extract.value,
        },
      }),
      ...(beverage.producer?.brewing?.extract && {
        producer: {
          relate: beverage.producer.brewing.extract.relate,
          unit: beverage.producer.brewing.extract.unit,
          value: +beverage.producer.brewing.extract.value,
        },
      }),
    },
    alcohol: {
      ...(beverage.label.brewing?.alcohol && {
        label: {
          relate: beverage.label.brewing.alcohol.relate,
          unit: beverage.label.brewing.alcohol.unit,
          value: +beverage.label.brewing.alcohol.value,
          ...(beverage.label.brewing.alcohol.scope && {
            scope: beverage.label.brewing.alcohol.scope,
          }),
        },
      }),
      ...(beverage.producer?.brewing?.alcohol && {
        producer: {
          relate: beverage.producer.brewing.alcohol.relate,
          unit: beverage.producer.brewing.alcohol.unit,
          value: +beverage.producer.brewing.alcohol.value,
          ...(beverage.producer.brewing.alcohol.scope && {
            scope: beverage.producer.brewing.alcohol.scope,
          }),
        },
      }),
      ...(beverage.editorial?.brewing?.alcohol?.scope && {
        editorial: {
          scope: beverage.editorial.brewing.alcohol.scope,
        },
      }),
    },
    filtration: {
      ...(lodash.isBoolean(beverage.label.brewing?.filtration) && {
        label: beverage.label.brewing?.filtration,
      }),
      ...(lodash.isBoolean(beverage.producer?.brewing?.filtration) && {
        producer: beverage.producer?.brewing?.filtration,
      }),
      ...(lodash.isBoolean(beverage.editorial?.brewing?.filtration) && {
        editorial: beverage.editorial?.brewing?.filtration,
      }),
    },
    pasteurization: {
      ...(lodash.isBoolean(beverage.label.brewing?.pasteurization) && {
        label: beverage.label.brewing?.pasteurization,
      }),
      ...(lodash.isBoolean(beverage.producer?.brewing?.pasteurization) && {
        producer: beverage.producer?.brewing?.pasteurization,
      }),
      ...(lodash.isBoolean(beverage.editorial?.brewing?.pasteurization) && {
        editorial: beverage.editorial?.brewing?.pasteurization,
      }),
    },
    isAged: {
      ...(beverage.label.brewing?.aged?.length &&
        lodash.isEmpty(beverage.label.brewing.aged[0]) && { label: true }),
      ...(beverage.producer?.brewing?.aged?.length &&
        lodash.isEmpty(beverage.producer.brewing.aged[0]) && {
          producer: true,
        }),
      ...(beverage.editorial?.brewing?.aged?.length &&
        lodash.isEmpty(beverage.editorial.brewing.aged[0]) && {
          editorial: true,
        }),
    },
    aged: {
      ...(beverage.label.brewing?.aged?.length &&
        (beverage.label.brewing?.aged.length !== 1 ||
          !lodash.isEmpty(beverage.label.brewing.aged[0])) && {
          label: beverage.label.brewing.aged,
        }),
      ...(beverage.producer?.brewing?.aged?.length &&
        (beverage.producer.brewing?.aged.length !== 1 ||
          !lodash.isEmpty(beverage.producer.brewing.aged[0])) && {
          producer: beverage.producer.brewing.aged,
        }),
      ...(beverage.editorial?.brewing?.aged?.length &&
        (beverage.editorial.brewing?.aged.length !== 1 ||
          !lodash.isEmpty(beverage.editorial.brewing.aged[0])) && {
          editorial: beverage.editorial.brewing.aged,
        }),
    },
    style: {
      ...(beverage.label.brewing?.style?.length && {
        label: beverage.label.brewing.style,
      }),
      ...(beverage.producer?.brewing?.style?.length && {
        producer: beverage.producer.brewing.style,
      }),
      ...(beverage.editorial?.brewing?.style?.length && {
        editorial: beverage.editorial.brewing.style,
      }),
    },
    isDryHopped: {
      ...(beverage.label.brewing?.isDryHopped &&
        !beverage.label.brewing?.dryHopped?.length && { label: true }),
      ...(beverage.producer?.brewing?.isDryHopped &&
        !beverage.producer.brewing?.dryHopped?.length && { producer: true }),
      ...(beverage.editorial?.brewing?.isDryHopped &&
        !beverage.editorial.brewing?.dryHopped?.length && { editorial: true }),
    },
    dryHopped: {
      ...(beverage.label.brewing?.dryHopped?.length && {
        label: beverage.label.brewing.dryHopped.map((hop) => ({
          ...hop,
          name: translate(hop.name, desiredLanguage),
        })),
      }),
      ...(beverage.producer?.brewing?.dryHopped?.length && {
        producer: beverage.producer.brewing.dryHopped.map((hop) => ({
          ...hop,
          name: translate(hop.name, desiredLanguage),
        })),
      }),
      ...(beverage.editorial?.brewing?.dryHopped?.length && {
        editorial: beverage.editorial.brewing.dryHopped.map((hop) => ({
          ...hop,
          name: translate(hop.name, desiredLanguage),
        })),
      }),
    },
    hopRate: {
      ...(beverage.label.brewing?.hopRate && {
        label: {
          unit: beverage.label.brewing.hopRate.unit,
          value: +beverage.label.brewing.hopRate.value,
        },
      }),
      ...(beverage.producer?.brewing?.hopRate && {
        producer: {
          unit: beverage.producer.brewing.hopRate.unit,
          value: +beverage.producer.brewing.hopRate.value,
        },
      }),
    },
    expirationDate: {
      ...(beverage.label.brewing?.expirationDate && {
        label: beverage.label.brewing.expirationDate,
      }),
      ...(beverage.producer?.brewing?.expirationDate && {
        producer: beverage.producer.brewing.expirationDate,
      }),
    },
    ingredients: {
      ...(beverage.label.ingredients?.descriptive && {
        label: translate(
          beverage.label.ingredients.descriptive,
          desiredLanguage
        ),
      }),
      ...(beverage.producer?.ingredients?.descriptive && {
        producer: translate(
          beverage.producer.ingredients.descriptive,
          desiredLanguage
        ),
      }),
    },
    ingredientsTags: {
      ...(beverage.label.ingredients?.tags?.length && {
        label: beverage.label.ingredients.tags.map((ingredient) => ({
          ...ingredient,
          name: translate(ingredient.name, desiredLanguage),
        })),
      }),
      ...(beverage.producer?.ingredients?.tags?.length && {
        producer: beverage.producer.ingredients.tags.map((ingredient) => ({
          ...ingredient,
          name: translate(ingredient.name, desiredLanguage),
        })),
      }),
    },
    smokedMalt: {
      ...(lodash.isBoolean(beverage.label.ingredients?.smokedMalt) && {
        label: beverage.label.ingredients?.smokedMalt,
      }),
      ...(lodash.isBoolean(beverage.producer?.ingredients?.smokedMalt) && {
        producer: beverage.producer?.ingredients?.smokedMalt,
      }),
    },
    bitterness: {
      ...(lodash.isNumber(beverage.label.impressions?.bitterness) && {
        label: beverage.label.impressions?.bitterness,
      }),
      ...(lodash.isNumber(beverage.producer?.impressions?.bitterness) && {
        producer: beverage.producer?.impressions?.bitterness,
      }),
    },
    sweetness: {
      ...(lodash.isNumber(beverage.label.impressions?.sweetness) && {
        label: beverage.label.impressions?.sweetness,
      }),
      ...(lodash.isNumber(beverage.producer?.impressions?.sweetness) && {
        producer: beverage.producer?.impressions?.sweetness,
      }),
    },
    fullness: {
      ...(lodash.isNumber(beverage.label.impressions?.fullness) && {
        label: beverage.label.impressions?.fullness,
      }),
      ...(lodash.isNumber(beverage.producer?.impressions?.fullness) && {
        producer: beverage.producer?.impressions?.fullness,
      }),
    },
    power: {
      ...(lodash.isNumber(beverage.label.impressions?.power) && {
        label: beverage.label.impressions?.power,
      }),
      ...(lodash.isNumber(beverage.producer?.impressions?.power) && {
        producer: beverage.producer?.impressions?.power,
      }),
    },
    hoppyness: {
      ...(lodash.isNumber(beverage.label.impressions?.hoppyness) && {
        label: beverage.label.impressions?.hoppyness,
      }),
      ...(lodash.isNumber(beverage.producer?.impressions?.hoppyness) && {
        producer: beverage.producer?.impressions?.hoppyness,
      }),
    },
    temperature: {
      ...(beverage.label.impressions?.temperature && {
        label: {
          ...beverage.label.impressions.temperature,
          from: +beverage.label.impressions.temperature.from,
          to: +beverage.label.impressions.temperature.to,
        },
      }),
      ...(beverage.producer?.impressions?.temperature && {
        producer: {
          ...beverage.producer.impressions.temperature,
          from: +beverage.producer.impressions.temperature.from,
          to: +beverage.producer.impressions.temperature.to,
        },
      }),
    },
    color: {
      ...(beverage.editorial?.impressions?.color && {
        editorial: beverage.editorial.impressions.color,
      }),
    },
    clarity: {
      ...(beverage.editorial?.impressions?.clarity && {
        editorial: beverage.editorial.impressions.clarity,
      }),
    },
    container: {
      color: beverage.label.container.color,
      material: beverage.label.container.material,
      unit: beverage.label.container.unit,
      type: beverage.label.container.type,
      value: +beverage.label.container.value,
      ...(lodash.isBoolean(beverage.label.container.hasCork) && {
        hasCork: beverage.label.container.hasCork,
      }),
      ...(lodash.isBoolean(beverage.label.container.hasCapWireFlip) && {
        hasCapWireFlip: beverage.label.container.hasCapWireFlip,
      }),
    },
    price: {
      ...(beverage.label.price?.length && {
        label: beverage.label.price.map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
      ...(beverage.producer?.price?.length && {
        producer: beverage.producer.price.map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
      ...(beverage.editorial?.price?.length && {
        editorial: beverage.editorial.price.map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
    },
    photos: {
      ...(beverage.editorial?.photos?.cap && { cap: true }),
      ...(beverage.editorial?.photos?.gallery && {
        gallery: beverage.editorial.photos.gallery,
      }),
      ...(beverage.editorial?.photos?.outlines?.gallery && {
        outline: beverage.editorial.photos.outlines.gallery,
      }),
    },
    added: format(new Date(beverage.added), DateFormat[desiredLanguage], {}),
    ...(beverage.updated && {
      updated: format(
        new Date(beverage.updated),
        DateFormat[desiredLanguage],
        {}
      ),
    }),
  };

  deleteIfEmpty(
    [
      "series",
      "cooperation",
      "contract",
      "isContract",
      "place",
      "remark",
      "tale.producer",
      "tale",
      "beverageType",
      "fermentation",
      "extract",
      "alcohol",
      "filtration",
      "pasteurization",
      "isAged",
      "aged",
      "style",
      "isDryHopped",
      "dryHopped",
      "hopRate",
      "expirationDate",
      "ingredients",
      "ingredientsTags",
      "smokedMalt",
      "bitterness",
      "sweetness",
      "fullness",
      "power",
      "hoppyness",
      "temperature",
      "color",
      "clarity",
      "price",
      "photos",
    ],
    formattedObject
  );

  return formattedObject;
}
