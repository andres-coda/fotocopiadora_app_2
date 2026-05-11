import { MouseEventHandler, ReactNode } from "react";

export interface CardProp {
  chica?: boolean | undefined;
  activo?: boolean | undefined;
  jubilado?: boolean | undefined;
  inactivo?: boolean | undefined;
  ruta?: string | undefined;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  nuevoEstilo?: string | undefined;
}

export interface CardPropComp extends CardProp {
  children: ReactNode;
  ultActualizacion?: string | undefined;
}