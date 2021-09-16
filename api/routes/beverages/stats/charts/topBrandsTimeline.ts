import add from 'date-fns/add';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import max from 'date-fns/max';
import min from 'date-fns/min';

import { LanguageValue } from '/api/models/common/LanguageValue.d.ts';
import { TopBrandsTimelineBar } from '../StatsOutput.d.ts';
import { RawData } from '../RawData.d.ts';

export function getTopBrands(values: RawData[]) {
  type AccType = {
    [name: string]: {
      amount: number;
      badge: string;
      shortId: string;
      name: LanguageValue;
    };
  };

  const accumulator = values.reduce(
    (acc: AccType, { brand }) => ({
      ...acc,
      [brand.shortId]: {
        ...brand,
        amount: acc[brand.shortId] ? acc[brand.shortId].amount + 1 : 1,
      },
    }),
    {},
  );

  return Object.values(accumulator)
    .sort((a, b) => (a.amount < b.amount ? 1 : -1))
    .slice(0, 10);
};

export function topBrandsTimeline (values: RawData[]): TopBrandsTimelineBar[] {
  const domain: TopBrandsTimelineBar[] = [];
  const dates = values.map(({ added }) => new Date(added));
  const earliest = min(dates);
  const latest = max(dates);
  const endpoint = new Date(
    `${format(add(latest, { months: 1 }), 'yyyy-MM', {})}-01`,
  );
  let current = earliest;

  const topBrands = getTopBrands(values);

  do {
    domain.push({
      date: format(current, 'yyyy-MM', {}),
      brands: topBrands.map(props => ({
        ...props,
        amount: 0,
      })),
    });

    current = add(current, { months: 1 });
  } while (isBefore(current, endpoint));

  values.forEach(({ added, brand }) => {
    if (!topBrands.map(({ shortId }) => shortId).includes(brand.shortId)) {
      return false;
    }

    const index = domain.findIndex(
      ({ date }) => date === format(new Date(added), 'yyyy-MM', {}),
    );

    for (let i = index; i < domain.length; i += 1) {
      const selectedBrand = domain[i].brands.find(({ shortId }) => shortId === brand.shortId);
      selectedBrand!.amount += 1;
    }

    return true;
  });

  return domain;
};

