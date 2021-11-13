import { lodash } from 'lodash';

import type { AlcoholChartBar } from '../StatsOutput.d.ts';
import type { RawData } from '../RawData.d.ts';

export function alcoholChart(values: RawData[]): AlcoholChartBar[] {
  const alcoholValues = values
    .map(({ alcohol }) => {
      const label = alcohol?.label?.value;

      if (lodash.isNumber(label)) {
        return label;
      }

      const producer = alcohol?.producer?.value;

      if (lodash.isNumber(producer)) {
        return producer;
      }

      return false;
    })
    .filter(val => lodash.isNumber(val)) as number[];

  const domain: AlcoholChartBar[] = [];
  const max = Math.max(...alcoholValues) + 1;

  for (let value = 0; value <= max; value = lodash.round(value + 0.1, 1)) {
    domain.push({
      beverages: 0,
      value,
    });
  }

  alcoholValues.forEach(alcohol => {
    const match = domain.find(({ value }) => value === alcohol);

    if (match && lodash.isNumber(match.beverages)) {
      match.beverages += 1;
    }
  });

  return domain;
};
