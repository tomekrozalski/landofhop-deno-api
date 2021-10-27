import { lodash } from "lodash";
import format from "date-fns/format";

import type { Price } from "/api/models/beverage/details/fragments/Price.d.ts";
import type { Tale } from "/api/models/beverage/details/fragments/Tale.d.ts";
import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import type { AdminDetailsOutput } from "./AdminDetailsOutput.d.ts";

export function normalizer(beverage: BeverageTypes): AdminDetailsOutput {
  function normalizeLanguageValue({ language, value }: LanguageValue) {
    return {
      language: language ?? "--",
      value,
    };
  }

  function normalizePrice({ currency, date, shop, value }: Price): {
    currency: string;
    date: string;
    shop: string | null;
    value: string;
  } {
    return {
      currency,
      date: format(new Date(date), DateFormat.pl, {}),
      shop: shop ?? null,
      value: value.toString(),
    };
  }

  function normalizeTale({ article, language, lead }: Tale) {
    return {
      article: article ?? "",
      language: language ?? "--",
      lead,
    };
  }

  const formattedObject = {
    label: {
      badge: beverage.badge,
      // -----------
      name: beverage.label.general.name.map(normalizeLanguageValue),
      series: beverage.label.general?.series?.map(normalizeLanguageValue) ?? [],
      brand: beverage.label.general.brand.shortId,
      cooperation:
        beverage.label.general?.cooperation?.map(({ shortId }) => shortId) ??
        null,
      contract:
        beverage.label.general?.contract?.shortId ??
        (beverage.label.general?.isContract ? "--" : null),
      tale: beverage.label.general?.tale?.map(normalizeTale) ?? [],
      barcode: beverage.label.general?.barcode ?? null,
      // -----------
      fermentation: beverage.label.brewing?.fermentation ?? null,
      style: beverage.label.brewing?.style?.map(normalizeLanguageValue) ?? [],
      extract: {
        value: beverage.label.brewing?.extract?.value?.toString() ?? null,
        unit: beverage.label.brewing?.extract?.unit ?? null,
        relate: beverage.label.brewing?.extract?.relate ?? null,
      },
      alcohol: {
        value: beverage.label.brewing?.alcohol?.value?.toString() ?? null,
        unit: beverage.label.brewing?.alcohol?.unit ?? null,
        relate: beverage.label.brewing?.alcohol?.relate ?? null,
        scope:
          beverage.label.brewing?.alcohol?.scope ??
          (beverage.label.brewing?.alcohol ? "--" : null),
      },
      filtration: beverage.label.brewing?.filtration ?? null,
      pasteurization: beverage.label.brewing?.pasteurization ?? null,
      // -----------
      container: {
        color: beverage.label.container.color,
        hasCapWireFlip: beverage.label.container.hasCapWireFlip ?? false,
        hasCork: beverage.label.container.hasCork ?? false,
        material: beverage.label.container.material,
        type: beverage.label.container.type,
        unit: beverage.label.container.unit,
        value: +beverage.label.container.value,
      },
      price: beverage.label.price?.map(normalizePrice) ?? [],
    },
    producer: {
      series:
        beverage.producer?.general?.series?.map(normalizeLanguageValue) ?? [],
      cooperation:
        beverage.producer?.general?.cooperation?.map(
          ({ shortId }) => shortId
        ) ?? null,
      contract:
        beverage.producer?.general?.contract?.shortId ??
        (beverage.producer?.general?.isContract ? "--" : null),
      tale: beverage.producer?.general?.tale?.map(normalizeTale) ?? [],
      // -----------
      fermentation: beverage.producer?.brewing?.fermentation ?? null,
      style:
        beverage.producer?.brewing?.style?.map(normalizeLanguageValue) ?? [],
      extract: {
        value: beverage.producer?.brewing?.extract?.value?.toString() ?? null,
        unit: beverage.producer?.brewing?.extract?.unit ?? null,
        relate: beverage.producer?.brewing?.extract?.relate ?? null,
      },
      alcohol: {
        value: beverage.producer?.brewing?.alcohol?.value?.toString() ?? null,
        unit: beverage.producer?.brewing?.alcohol?.unit ?? null,
        relate: beverage.producer?.brewing?.alcohol?.relate ?? null,
        scope: beverage.producer?.brewing?.alcohol?.scope ?? null,
      },
      filtration: beverage.producer?.brewing?.filtration ?? null,
      pasteurization: beverage.producer?.brewing?.pasteurization ?? null,
      // -----------
      price: beverage.producer?.price?.map(normalizePrice) ?? [],
    },
    editorial: {
      cooperation:
        beverage.editorial?.general?.cooperation?.map(
          ({ shortId }) => shortId
        ) ?? null,
      contract:
        beverage.editorial?.general?.contract?.shortId ??
        (beverage.editorial?.general?.isContract ? "--" : null),
      // -----------
      fermentation: beverage.editorial?.brewing?.fermentation ?? null,
      style:
        beverage.editorial?.brewing?.style?.map(normalizeLanguageValue) ?? [],
      alcoholScope: beverage.editorial?.brewing?.alcohol?.scope ?? null,
      filtration: beverage.editorial?.brewing?.filtration ?? null,
      pasteurization: beverage.editorial?.brewing?.pasteurization ?? null,
      // -----------
      price: beverage.editorial?.price?.map(normalizePrice) ?? [],
      notes: beverage.editorial?.notes ?? null,
    },
  };

  return formattedObject;
}
