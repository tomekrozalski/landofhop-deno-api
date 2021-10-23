import { lodash } from "lodash";
// import format from "date-fns/format";

import type { Tale } from "/api/models/beverage/details/fragments/Tale.d.ts";
import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
// import { DateFormat } from "/api/utils/enums/DateFormat.enum.ts";
import { Beverage as BeverageTypes } from "/api/models/beverage/details/Beverage.d.ts";
import type { AdminDetailsOutput } from "./AdminDetailsOutput.d.ts";

export function normalizer(beverage: BeverageTypes): AdminDetailsOutput {
  function normalizeLanguageValue({ language, value }: LanguageValue) {
    return {
      language: language ?? "--",
      value,
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
      tale: beverage.label.general?.tale?.map(normalizeTale) ?? [],
      barcode: beverage.label.general?.barcode ?? null,
      // -----------
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
    },
    producer: {
      series:
        beverage.producer?.general?.series?.map(normalizeLanguageValue) ?? [],
      cooperation:
        beverage.producer?.general?.cooperation?.map(
          ({ shortId }) => shortId
        ) ?? null,
      tale: beverage.producer?.general?.tale?.map(normalizeTale) ?? [],
      // -----------
      filtration: beverage.producer?.brewing?.filtration ?? null,
      pasteurization: beverage.producer?.brewing?.pasteurization ?? null,
    },
    editorial: {
      cooperation:
        beverage.editorial?.general?.cooperation?.map(
          ({ shortId }) => shortId
        ) ?? null,
      // -----------
      filtration: beverage.editorial?.brewing?.filtration ?? null,
      pasteurization: beverage.editorial?.brewing?.pasteurization ?? null,
      // -----------
      notes: beverage.editorial?.notes ?? null,
    },
  };

  return formattedObject;
}
