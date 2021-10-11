import { Editorial } from "./Editorial.d.ts";
import { Label } from "./Label.d.ts";
import { Producer } from "./Producer.d.ts";

export type BeverageWithoutId = {
  shortId: string;
  badge: string;
  label: Label;
  producer?: Producer;
  editorial?: Editorial;
  added: Date;
  updated?: Date;
};

export type Beverage = BeverageWithoutId & { _id: string };
