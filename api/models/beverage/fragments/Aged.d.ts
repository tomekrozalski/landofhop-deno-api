import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
} from "/api/models/beverage/enums/index.ts";

export type Aged = {
  type?: AgedType;
  wood?: AgedWood;
  time?: {
    value: number;
    unit: AgedTimeUnit;
  };
  previousContent?: AgedPreviousContent[];
};
