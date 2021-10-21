import { lodash } from "lodash";
// import format from "date-fns/format";

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

  const formattedObject = {
    label: {
      badge: beverage.badge,
      name: beverage.label.general.name.map(normalizeLanguageValue),
      series: beverage.label.general?.series?.map(normalizeLanguageValue) ?? [],
      brand: beverage.label.general.brand.shortId,
      cooperation:
        beverage.label.general?.cooperation?.map(({ shortId }) => shortId) ??
        null,
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
    },
    editorial: {
      cooperation:
        beverage.editorial?.general?.cooperation?.map(
          ({ shortId }) => shortId
        ) ?? null,
      notes: beverage.editorial?.notes ?? null,
    },
  };

  return formattedObject;
}
