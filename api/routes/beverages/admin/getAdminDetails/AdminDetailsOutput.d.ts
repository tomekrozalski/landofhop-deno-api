import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
  AlcoholRelate,
  AlcoholUnit,
  AlcoholScope,
  Clarity,
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
} from "/api/models/beverage/enums.ts";

export type AdminDetailsOutput = {
  label: {
    badge: string;
    // -----------
    name: {
      language: string;
      value: string;
    }[];
    series: {
      language: string;
      value: string;
    }[];
    brand: string;
    cooperation: string[] | null;
    contract: string | null;
    place: string | null;
    remark: {
      language: string;
      value: string;
    }[];
    tale: {
      article: string;
      language: string;
      lead: string;
    }[];
    barcode: string | null;
    // -----------
    fermentation: Fermentation[] | null;
    style: {
      language: string;
      value: string;
    }[];
    extract: {
      value: string | null;
      unit: ExtractUnit | null;
      relate: ExtractRelate | null;
    };
    alcohol: {
      value: string | null;
      unit: AlcoholUnit | null;
      relate: AlcoholRelate | null;
      scope: AlcoholScope | string | null;
    };
    filtration: boolean | null;
    pasteurization: boolean | null;
    aged: {
      previousContent: AgedPreviousContent[];
      time: {
        value: string;
        unit: AgedTimeUnit;
      };
      type: AgedType | null;
      wood: AgedWood | null;
    }[];
    dryHopped: string[] | null;
    hopRate: {
      value: string | null;
      unit: string | null;
    };
    nitrogen: boolean | null;
    expirationDate: {
      value: string | null;
      unit: string | null;
    };
    // -----------
    ingredients: {
      complete: boolean;
      language: string;
      list: string[];
    }[];
    ingredientTags: string[] | null;
    smokedMalt: boolean | null;
    // -----------
    bitterness: number | null;
    sweetness: number | null;
    fullness: number | null;
    power: number | null;
    hoppyness: number | null;
    temperature: {
      from: string | null;
      to: string | null;
      unit: string | null;
    };
    // -----------
    container: {
      color: ContainerColor;
      hasCapWireFlip: boolean;
      hasCork: boolean;
      material: ContainerMaterial;
      type: ContainerType;
      unit: ContainerUnit;
      value: number;
    };
    price: {
      currency: string;
      date: string;
      shop: string | null;
      value: string;
    }[];
  };
  producer: {
    series: {
      language: string;
      value: string;
    }[];
    cooperation: string[] | null;
    contract: string | null;
    place: string | null;
    remark: {
      language: string;
      value: string;
    }[];
    tale: {
      article: string;
      language: string;
      lead: string;
    }[];
    // -----------
    fermentation: Fermentation[] | null;
    style: {
      language: string;
      value: string;
    }[];
    extract: {
      value: string | null;
      unit: ExtractUnit | null;
      relate: ExtractRelate | null;
    };
    alcohol: {
      value: string | null;
      unit: AlcoholUnit | null;
      relate: AlcoholRelate | null;
      scope: AlcoholScope | null;
    };
    filtration: boolean | null;
    pasteurization: boolean | null;
    aged: {
      previousContent: AgedPreviousContent[];
      time: {
        value: string;
        unit: AgedTimeUnit;
      };
      type: AgedType | null;
      wood: AgedWood | null;
    }[];
    dryHopped: string[] | null;
    hopRate: {
      value: string | null;
      unit: string | null;
    };
    nitrogen: boolean | null;
    expirationDate: {
      value: string | null;
      unit: string | null;
    };
    // -----------
    ingredients: {
      complete: boolean;
      language: string;
      list: string[];
    }[];
    ingredientTags: string[] | null;
    smokedMalt: boolean | null;
    // -----------
    bitterness: number | null;
    sweetness: number | null;
    fullness: number | null;
    power: number | null;
    hoppyness: number | null;
    temperature: {
      from: string | null;
      to: string | null;
      unit: string | null;
    };
    // -----------
    price: {
      currency: string;
      date: string;
      shop: string | null;
      value: string;
    }[];
  };
  editorial: {
    cooperation: string[] | null;
    contract: string | null;
    place: string | null;
    remark: {
      language: string;
      value: string;
    }[];
    // -----------
    fermentation: Fermentation[] | null;
    // style: {
    //   language: string;
    //   value: string;
    // }[];
    alcoholScope: AlcoholScope | null;
    filtration: boolean | null;
    pasteurization: boolean | null;
    aged: {
      previousContent: AgedPreviousContent[];
      time: {
        value: string;
        unit: AgedTimeUnit;
      };
      type: AgedType | null;
      wood: AgedWood | null;
    }[];
    dryHopped: string[] | null;
    nitrogen: boolean | null;
    // -----------
    color: string | null;
    clarity: Clarity | null;
    // -----------
    price: {
      currency: string;
      date: string;
      shop: string | null;
      value: string;
    }[];
    notes: string | null;
  };
};
