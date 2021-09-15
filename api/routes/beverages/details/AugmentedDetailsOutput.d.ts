import { LinkDataOutput } from "./LinkDataOutput.d.ts";
import { DetailsOutput } from "./DetailsOutput.d.ts";

export type AugmentedDetailsOutput = {
  previous: LinkDataOutput | null;
  details: DetailsOutput;
  next: LinkDataOutput | null;
};
