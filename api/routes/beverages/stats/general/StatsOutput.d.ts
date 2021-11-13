import { LanguageValue } from '/api/models/common/LanguageValue.d.ts';

export type AddTimelineBar = {
  date: string;
  bottle: number;
  can: number;
};

export type AlcoholChartBar = {
  value: number;
  beverages: number;
};

export type TopBrandsTimelineBar = {
  date: string;
  brands: {
    amount: number;
    badge: string;
    shortId: string;
    name: LanguageValue;
  }[];
};

export type Stats = {
  addTimelineData: AddTimelineBar[];
  alcoholChartData: AlcoholChartBar[];
  topBrandsTimelineData: TopBrandsTimelineBar[];
};
