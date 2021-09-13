import { Editorial } from "./Editorial.d.ts";
import { Label } from "./Label.d.ts";
import { Producer } from "./Producer.d.ts";

export type Beverage = {
  id: string;
  shortId: string;
  badge: string;
  label: Label;
  producer?: Producer;
  editorial?: Editorial;
  added: Date;
  updated?: Date;
};
