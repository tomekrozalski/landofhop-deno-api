import { Editorial, Label, Producer } from "./index.d.ts";

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
