// import { _ } from "https://x.nest.land/deno-lodash@1.0.0/mod.ts";
import { lodash } from "lodash";

import { translate } from "/api/utils/translate.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import { Institution as InstitutionTypes } from "/api/models/beverage/details/fragments/Institution.d.ts";
import type { InsitutionOutput } from "./DetailsOutput.d.ts";

export function normalizer(
  beverage: BeverageTypes,
  desiredLanguage: string
): any {
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
        label: beverage.label.general.cooperation?.map(({ name }) =>
          translate(name, desiredLanguage)
        ),
      }),
      ...(beverage.producer?.general?.cooperation?.length && {
        producer: beverage.producer.general.cooperation.map(({ name }) =>
          translate(name, desiredLanguage)
        ),
      }),
      ...(beverage.editorial?.general?.cooperation?.length && {
        editorial: beverage.editorial.general.cooperation.map(({ name }) =>
          translate(name, desiredLanguage)
        ),
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
          country: beverage.label.general.place.country,
        },
      }),
      ...(beverage.producer?.general?.place?.city && {
        producer: {
          city: translate(
            beverage.producer.general.place.city,
            desiredLanguage
          ),
          country: beverage.producer.general.place.country,
        },
      }),
      ...(beverage.editorial?.general?.place?.city && {
        editorial: {
          city: translate(
            beverage.editorial.general.place.city,
            desiredLanguage
          ),
          country: beverage.editorial.general.place.country,
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
  };

  const deleteIfEmpty = (fields: string[]) => {
    fields.forEach((field) => {
      if (lodash.isEmpty(lodash.get(formattedObject, field))) {
        lodash.unset(formattedObject, field);
      }
    });
  };

  deleteIfEmpty([
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
    "ingredientsDescription",
    "ingredientsList",
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
  ]);

  return formattedObject;
}
