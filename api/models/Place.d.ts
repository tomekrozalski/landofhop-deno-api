import { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { InstitutionEssence } from "/api/models/Institution.d.ts";

export type PlaceEssence = {
  city: LanguageValue[];
  country: string;
  institution: InstitutionEssence;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  shortId: string;
};

export type Place = PlaceEssence & { _id: string };
