import { MouseEventHandler, ReactNode } from 'react';

export interface CardProp {
  limitado?:boolean;
  gigante?:boolean;
  listo?: boolean;
  pendiente?: boolean;
  retirado?: boolean;
  cancelado?:boolean;
  ruta?: string | undefined;
  onClick?: MouseEventHandler<HTMLDivElement>;
  nuevoEstilo?: string;
}

interface CardInternoProp {
  children: ReactNode;
  ultActualizacion?: string;
  tituloCard?: string;
  notaMargenSup?: string;
}

export interface CardConsecuenciasProp {
  loading?:boolean,
  error?: string | null,
}

export interface CardPropComp extends CardProp, CardInternoProp, CardConsecuenciasProp {}

export interface CardContenedorProp extends CardInternoProp, Pick<CardProp, 'onClick'>, CardConsecuenciasProp{
  clase:string;
}
