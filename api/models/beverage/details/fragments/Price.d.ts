import { Currency } from "/api/models/beverage/enums/index.ts";

export type Price = {
  date: Date;
  value: any; // @ToDo: number
  currency?: Currency;
};
