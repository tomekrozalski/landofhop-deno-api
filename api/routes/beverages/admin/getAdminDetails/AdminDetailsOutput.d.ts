import {
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
} from "/api/models/beverage/enums.ts";

export type AdminDetailsOutput = {
  label: {
    badge: string;
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
    container: {
      color: ContainerColor;
      hasCapWireFlip: boolean;
      hasCork: boolean;
      material: ContainerMaterial;
      type: ContainerType;
      unit: ContainerUnit;
      value: number;
    };
  };
  producer: {
    series: {
      language: string;
      value: string;
    }[];
    cooperation: string[] | null;
  };
  editorial: {
    cooperation: string[] | null;
    notes: string | null;
  };
};
