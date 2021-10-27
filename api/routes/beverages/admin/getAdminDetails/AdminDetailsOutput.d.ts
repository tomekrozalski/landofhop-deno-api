import {
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
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
    tale: {
      article: string;
      language: string;
      lead: string;
    }[];
    barcode: string | null;
    // -----------
    filtration: boolean | null;
    pasteurization: boolean | null;
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
    // -----------
    filtration: boolean | null;
    pasteurization: boolean | null;
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
    // -----------
    filtration: boolean | null;
    pasteurization: boolean | null;
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
