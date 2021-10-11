import type { Institution } from "/api/models/beverage/details/fragments/Institution.d.ts";
import type { LanguageValue } from "/api/models/common/LanguageValue.d.ts";
import { Container } from "/api/models/beverage/details/fragments/Container.d.ts";

export type RequestTypes = {
  label: {
    badge: string;
    name: LanguageValue[];
    series?: LanguageValue[];
    brand: Institution;
    cooperation?: Institution[];
    container: Container;
  };
};
