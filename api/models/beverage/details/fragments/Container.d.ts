import {
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
} from "/api/models/beverage/enums.ts";

export type Container = {
  color: ContainerColor;
  material: ContainerMaterial;
  unit: ContainerUnit;
  type: ContainerType;
  value: number;
  hasCork?: boolean;
  hasCapWireFlip?: boolean;
};
