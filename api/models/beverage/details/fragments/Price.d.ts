import { Currency } from "/api/models/beverage/enums.ts";

export type Price = {
  currency: Currency;
  date: Date;
  shop?: string;
  value: number;
};
