import { Currency } from "/api/models/beverage/enums/index.ts";

export type Price = {
  date: Date;
  value: number;
  currency?: Currency;
};
