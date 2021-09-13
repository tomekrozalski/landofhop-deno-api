import { Currency } from "/api/models/beverage/enums.ts";

export type Price = {
  date: Date;
  value: number;
  currency?: Currency;
};
